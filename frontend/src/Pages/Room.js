import React, { Component } from 'react'

export default class Room extends Component {

    constructor (props) {
        super(props);
        this.state = {
            votesToSkip: 2,
            isHost: false,
            guestCanPause: false
        };

        this.roomCode = this.props.match.params.code;
        this.getRoomDetails();
    }

    getRoomDetails = () => {
        fetch('/api/get-room' + '?code=' + this.roomCode)
            .then((res) => res.json())
            .then((data) => {
                this.setState({
                    votesToSkip: data.votes_to_skip,
                    guestCanPause: data.guest_can_pause,
                    isHost: data.is_host,
                });
                console.log(data);
            });
    }

    render() {
        return (
            <div>
                <h3>{this.roomCode}</h3>
                <p>Votes: {this.state.votesToSkip}</p>
                <p>Guest: {this.state.guestCanPause.toString()}</p>
                <p>Host: {this.state.isHost.toString()}</p>
            </div>
        )
    }
}
