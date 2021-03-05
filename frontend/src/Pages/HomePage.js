import { Typography, Grid, Button, ButtonGroup } from '@material-ui/core'
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class HomePage extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Grid container spacing={0} className="center">
                <Grid item xs={12} align="center">
                    <Typography component="h2" variant="h1">
                        Welcome to House Party &#129395;
                    </Typography>
                </Grid>
                <Grid item xs={12} align="center">
                    <ButtonGroup variant="contained">
                        <Button variant="contained" to="/create_room" component={Link} color="primary">Create Room</Button>
                        <Button variant="outlined" to="/join_room" component={Link} color="secondary">Join Room</Button>
                    </ButtonGroup>
                </Grid>
            </Grid>
        )
    }
}
