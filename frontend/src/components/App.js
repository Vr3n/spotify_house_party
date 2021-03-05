import React, { Component } from 'react';

import {render} from 'react-dom';
import HomePage from '../Pages/HomePage';
import CreateRoom from '../Pages/CreateRoom';
import RoomJoin from '../Pages/RoomJoin';
import Room from '../Pages/Room';

import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';

export class App extends Component {

    constructor(props) {
        super(props)

        this.state = {
            roomCode: null,
        }
    }

    async componentDidMount () {
        fetch('/api/user-in-room/')
            .then((res) => res.json())
            .then((data) => {
                console.log(data.code)
                this.setState({
                    roomCode: data.code,
                });
            });
    }

    renderHomePage = () => <HomePage />

    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/room/:code" exact component={Room} />
                    <Route path="/join_room" exact component={RoomJoin} />
                    <Route path="/create_room" exact component={CreateRoom} />
                    <Route path="/" render={() => this.state.roomCode ? (<Redirect to={`/room/${this.state.roomCode}/`} />) : (this.renderHomePage())}></Route>
                </Switch>
            </Router>
        
        )
    }
}

const appDiv = document.getElementById('app');

render(<App />, appDiv);
