import React, {useState} from 'react'
import {connect} from 'react-redux'
import {makeStyles} from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import Button from '@material-ui/core/Button'
import Avatar from '@material-ui/core/Avatar'
import ListItemText from '@material-ui/core/ListItemText'

import {setAuthedUser} from '../actions/authedUser'


const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: 100
    },
    signinHead: {
        height: '50px',
        width: '500px',
        textAlign: 'center',
        backgroundColor: '#e0e0e0',
        padding: '5px 0;'

    },
    signinBottom: {
        height: '600px',
        width: '500px',
    },
    signinImageContainer: {
        height: '200px',
        width: '500px',
        textAlign: 'center',
    },
    signinImage: {
        marginTop: '50px',
        height: '124px',
        width: '140px',
    },
    signinControls: {
        height: '200px',
        width: '500px',
    },
    welcometext: {
        fontWeight: 'bold',
        fontSize: '120%'
    },
    welcomesignintext: {
        fontSize: '90%'
    },
    signInTextContainer: {
        height: '50px',
        width: '500px',
        textAlign: 'center'
    },
    signInText: {
        fontWeight: 'bold',
        fontSize: '150%',
        color: '#033a87'
    },
    formControl: {
        height: '180px',
        width: '450px'
    }
  }));

const SignIn = (props) => {
    const {usersById, dispatch} = props
    const classes = useStyles()
    const [selectedUser, setSelectedUser] = useState('')

    const handleSelectedUserChange = (event) => setSelectedUser(event.target.value)
    const handleSignInClick = () => {
        dispatch(setAuthedUser(selectedUser))
    }

    return (
        <Grid item className={classes.root}>
            <Grid container spacing={0} direction="column" justify="center" alignItems="center">
                <Grid key='signin-head' item>
                    <Paper className={classes.signinHead} square={true} elevation={1}>
                        <span className={classes.welcometext}>Welcome to the Would You Rather App !</span>
                        <br/>
                        <span className={classes.welcomesignintext}>Please sign in to continue</span>                    
                    </Paper>
                </Grid>
                <Grid key='signin-bottom' item>
                    <Paper elevation={1}>
                        <Grid item>
                            <Grid container spacing={0} direction="column" justify="center" alignItems="center">
                                <Grid key='signin-image' item>
                                    <Paper className={classes.signinImageContainer} square={true} elevation={0}>
                                        <img alt='sign-in' src='react-redux.png' className={classes.signinImage}/>
                                    </Paper>
                                </Grid>
                                <Grid key='signin-text' item>
                                    <Paper className={classes.signInTextContainer} square={true} elevation={0}>
                                        <span className={classes.signInText}>Sign In</span>
                                    </Paper>
                                </Grid>
                                <Grid key='signin-controls' item>
                                    <FormControl variant="outlined" className={classes.formControl}>
                                        <InputLabel id="demo-simple-select-outlined-label">Select User</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-outlined-label"
                                            id="demo-simple-select-outlined"
                                            value={selectedUser}
                                            onChange={handleSelectedUserChange}
                                            label="Select User"
                                        >
                                            {Object.keys(usersById).map(uId => (
                                                <MenuItem key={uId} value={uId}>
                                                    <Avatar alt={uId} src={usersById[uId].avatarURL} />
                                                    <ListItemText primary={usersById[uId].name} />
                                                </MenuItem>
                                            ))}
                                        </Select>
                                        <br />
                                        <Button 
                                            variant="contained" 
                                            color="primary"
                                            disabled={selectedUser === ''}
                                            onClick={handleSignInClick}
                                        >
                                            Sign In
                                        </Button>
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </Grid>
      )
}



function mapStateToProps({users}) {
    return {
        usersById: users
    }
}

export default connect(mapStateToProps)(SignIn)