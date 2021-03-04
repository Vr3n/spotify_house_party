import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { Link } from 'react-router-dom'
import { FormControl } from '@material-ui/core';

export default class CreateRoom extends Component {
    defaultVotes = 1;

    constructor (props) {
        super(props)
        this.state = {
            guestCanPause: false,
            votesToSkip: this.defaultVotes,
        }

        this.roomButtonPressedHandler = this.roomButtonPressedHandler.bind(this);
        this.votesChangeHandler = this.votesChangeHandler.bind(this);
        this.guestCanPauseHandler = this.guestCanPauseHandler.bind(this);
    }

    votesChangeHandler = (e) => {
        this.setState({
            votesToSkip: e.target.value,
        });
    }

    guestCanPauseHandler = (e) => {
        this.setState({
            guestCanPause: e.target.value === "true" ? true : false,
        });
    }

    roomButtonPressedHandler = () => {
        
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({
                votes_to_skip: this.state.votesToSkip,
                guest_can_pause: this.state.guestCanPause
            })
        }

        fetch('/api/create-room/', requestOptions)
            .then((res) => res.json())
            .then((data) => console.log(data));

    }

    render() {
        return (
            <Grid container spacing={1}>
                {console.log(this.state)}
                <Grid item xs={12} align="center">
                    <Typography component="h4" variant="h4">
                        Create A Room
                    </Typography>
                </Grid>
                <Grid item xs={12} align="center">
                    <FormControl component="fieldset">
                        <FormHelperText>
                            <div align="center">Guest Control of Playback State</div>
                        </FormHelperText>
                        <RadioGroup row defaultValue={this.state.guestCanPause ? "true" : "false"} onChange={this.guestCanPauseHandler}>
                            <FormControlLabel value="true" control={<Radio color="primary"  />} label="Play/Pause" labelPlacement="bottom" />
                            <FormControlLabel value="false" control={<Radio color="secondary"  />} label="No Control" labelPlacement="bottom" />
                        </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid item xs={12} align="center">
                    <FormControl>
                        <TextField onChange={this.votesChangeHandler} required={true} type="number" default={this.defaultVotes} inputProps={{
                            min: 1,
                            style: {
                                textAlign: 'center'
                            }
                        }} />
                        <FormHelperText>
                            <div align="center">Votes Required To Skip Song</div>
                        </FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item xs={12} align="center" onClick={this.roomButtonPressedHandler}>
                    <Button variant="contained" color="primary">Create A Room</Button>
                </Grid>
                <Grid item xs={12} align="center">
                    <Button variant="contained" color="secondary" to="/" component={Link} >Back</Button>
                </Grid>
            </Grid>
        )
    }
}
