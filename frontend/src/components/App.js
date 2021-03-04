import React, { Component } from 'react';

import {render} from 'react-dom';
import HomePage from '../Pages/HomePage';
import CreateRoom from '../Pages/CreateRoom';
import RoomJoin from '../Pages/RoomJoin';

import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';

export class App extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/join_room" exact component={RoomJoin} />
                    <Route path="/create_room" exact component={CreateRoom} />
                    <Route path="/" component={HomePage}></Route>
                </Switch>
            </Router>
        
        )
    }
}

const appDiv = document.getElementById('app');

render(<App />, appDiv);
