import { Typography, Grid, Button } from '@material-ui/core'
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class HomePage extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Grid container spacing={0}>
                <Grid item xs={12} align="center">
                    <Typography component="h1" variant="h1">
                        Welcome to House Party &#129395;
                    </Typography>
                </Grid>
                <Grid item xs={12} align="center">
                    <Button variant="contained" to="/create_room" component={Link} color="primary">Create Room</Button>
                </Grid>
            </Grid>
        )
    }
}
