import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import React, { Component } from 'react'

import CreateRoom from './CreateRoom'
import MusicPlayer from '../components/MusicPlayer';

export default class Room extends Component {

    constructor (props) {
        super(props);
        this.state = {
            votesToSkip: 2,
            isHost: false,
            guestCanPause: false,
            showSettings: false,
            spotifyAuthenticated: false,
            song: {}
        };

        this.roomCode = this.props.match.params.code;
        this.getRoomDetails();
    }

    componentDidMount () {
        this.interval = setInterval(this.getCurrentSong, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    authenticateSpotify = () => {
        fetch('/spotify_api/is-spotify-authenticated')
            .then(res => res.json())
            .then(data => {
                this.setState({
                    spotifyAuthenticated: data.status
                })
                console.log(data)
                if (!data.status) {
                    fetch('/spotify_api/get-auth-url')
                        .then(res => res.json())
                        .then(data => {
                            window.location.replace(data.url);
                        });
                }
            });
    }

    getRoomDetails = () => {
        fetch('/api/get-room' + '?code=' + this.roomCode)
            .then((res) => res.json())
            .then((data) => {
                this.setState({
                    votesToSkip: data.votes_to_skip,
                    guestCanPause: data.guest_can_pause,
                    isHost: data.is_host
                });
                if (this.state.isHost) {
                    this.authenticateSpotify()
                }
                console.log(data);
            });
    }

    getCurrentSong = () => {
        fetch('/spotify_api/current-song')
            .then(res => res.ok ? res.json() : {})
            .then(data => {
                console.log(data);
                this.setState({
                    song: data
                })
            });
    }

    leaveRoomHandler = () => {
        const requestOptions = {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            }
        }

        fetch('/api/leave-room/', requestOptions)
            .then((_res) => {
                this.props.history.push('/');
            })
    }

    updateShowSettings = value => {
        this.setState({
            showSettings: value,
        })
    }

    renderSettings = () => (
        <Grid container spacing={1} className="center">
            <Grid item xs={12}>
                <CreateRoom update={true} votesToSkip={this.state.votesToSkip} guestCanPause={this.state.guestCanPause} roomCode={this.roomCode} updateCallback={this.getRoomDetails} />
                <Button variant="contained" color="secondary" onClick={() => this.updateShowSettings(false)}>Close settings</Button>
            </Grid>
        </Grid>
    )

    renderSettingsButton = () => (
        <Grid item xs={12} align="center">
            <Button variant="contained" color="primary" onClick={() => this.updateShowSettings(true)}>Settings</Button>
        </Grid>
    )

    render() {

        if (this.state.showSettings) {
            return this.renderSettings();
        }

        return (
            <Grid container spacing={1} alignItems="center" className="center" >
                <Grid item align="center" xs={12}>
                    <Typography component="h3" variant="h3">
                        Room no: {this.roomCode}
                    </Typography>
                </Grid>
                <MusicPlayer {...this.state.song} />
                {
                    this.state.isHost ? this.renderSettingsButton() : null
                }
                <Grid item align="center" xs={12}>
                    <Button variant="contained" color="secondary" onClick={this.leaveRoomHandler} >Leave Room</Button>
                </Grid>
            </Grid>
        )
    }
}
