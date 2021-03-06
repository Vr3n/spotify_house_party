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
import { Collapse } from "@material-ui/core";
import { Alert } from '@material-ui/lab';
export default class CreateRoom extends Component {

    static defaultProps = {
        votesToSkip: 2,
        guestCanPause: true,
        update: false,
        roomCode: null,
        updateCallback: () => {},
    }

    constructor (props) {
        super(props)
        this.state = {
            guestCanPause: this.props.guestCanPause,
            votesToSkip: this.props.votesToSkip,
            update: this.props.update,
            errorMsg: "",
            successMsg: "",
        }
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
            .then((data) => this.props.history.push('/room/' + data.code) + '/');

    }

    updateButtonPressHandler = () => {
        const requestOptions = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                votes_to_skip: this.state.votesToSkip,
                guest_can_pause: this.state.guestCanPause,
                code: this.props.roomCode
            }),
        }

        fetch('/api/update-room/', requestOptions)
            .then((res) => {  
                if (res.ok) {
                    this.setState({
                        successMsg: "Room updated successfully"
                    })
                } else {
                    this.setState({
                        errorMsg: "Error updating room..."
                    })
                }
                this.props.updateCallback();
            })
            // .then(data => this.props.history.push("/room/" + data.code + "/"));
    }

    renderCreateButton = () => (
        <Grid container spacing={1}>
            <Grid item xs={12} align="center" onClick={() => this.roomButtonPressedHandler()}>
                <Button variant="contained" color="primary">Create A Room</Button>
            </Grid>
            <Grid item xs={12} align="center">
                <Button variant="contained" color="secondary" to="/" component={Link} >Back</Button>
            </Grid>
        </Grid>
    )

    renderUpdateButton = () => {
        <Grid container spacing={1}>
            <Grid item xs={12} align="center" onClick={() => this.updateButtonPressHandler()}>
                <Button variant="contained" color="primary">Update A Room</Button>
            </Grid>
        </Grid>
    }

    render() {

        const title = this.props.update ? "Update Room" : "Create a Room"; 

        return (
            <Grid container spacing={1} align="center" className="center">
                {console.log(this.props)}
                <Grid item xs={12} align="center">
                    <Collapse in={this.state.errorMsg != "" || this.state.successMsg != ""}>

                        {
                            this.state.successMsg !== "" ? (<Alert severity="success" onClose={() => { this.setState({
                                successMsg: ""
                            }) }}>
                                {this.state.successMsg}
                            </Alert>): (<Alert severity="error" onClose={() => { this.setState({
                                errorMsg: ""
                            }) }}>{this.state.errorMsg}</Alert>)
                        }
                    </Collapse>
                </Grid>
                <Grid item xs={12} align="center">
                    <Typography component="h4" variant="h4">
                        {title}
                    </Typography>
                </Grid>
                <Grid item xs={12} align="center">
                    <FormControl component="fieldset">
                        <FormHelperText>
                            <div align="center">Guest Control of Playback State</div>
                        </FormHelperText>
                        <RadioGroup row defaultValue={this.props.guestCanPause.toString()} onChange={this.guestCanPauseHandler}>
                            <FormControlLabel value="true" control={<Radio color="primary"  />} label="Play/Pause" labelPlacement="bottom" />
                            <FormControlLabel value="false" control={<Radio color="secondary"  />} label="No Control" labelPlacement="bottom" />
                        </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid item xs={12} align="center">
                    <FormControl>
                        <TextField onChange={this.votesChangeHandler} required={true} type="number" defaultValue={this.state.votesToSkip} inputProps={{
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
                {
                    !this.props.update ? this.renderCreateButton() : (<Grid container spacing={1}>
                        <Grid item xs={12} align="center" onClick={() => this.updateButtonPressHandler()}>
                            <Button variant="contained" color="primary">Update A Room</Button>
                        </Grid>
                    </Grid>)
                }
            </Grid>
        )
    }
}
