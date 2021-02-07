import React, {useState} from 'react';
import {connect} from 'react-redux'
import {makeStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

import {handleAddQuestion} from '../actions/questions'
import {Redirect} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      marginTop: '100px'
    },
    headerContainer: {
        backgroundColor: '#e0e0e0',
        paddingTop: '10px',
        paddingBottom: '10px',
        textAlign: 'center'
    },
    headerText: {
        fontSize: '150%',
        fontWeight: 'bold'
    },
    completeText: {
        fontSize: '90%',
        fontWeight: 'bold'
    },
    wouldText: {
        fontSize: '120%',
        fontWeight: 'bold'
    },
    innerContainer: {
        width: '100%'
    },
    outerContainer: {
        borderStyle: 'groove'
    },
    dividerContainer: {
        display: "flex",
        alignItems: "center"
    },
    dividerBorder: {
        borderBottom: "1px solid lightgray",
        width: "100%"
    },
  }));
  

const AddQuestion = (props) => {
    const classes = useStyles()
    const [option1Text, setOption1Text] = useState('')
    const [option2Text, setOption2Text] = useState('')

    const {dispatch, authedUser} = props

    const [redirect, setRedirect] = useState(false)

    const handleOptionChange = (fn) => (event) => fn(event.target.value)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const question = await dispatch(handleAddQuestion({
            optionOneText: option1Text,
            optionTwoText: option2Text,
            author: authedUser
        }))
        setRedirect(true)
    }

    if (redirect) {
        return (<Redirect to='/' />)
    }

    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="sm" className={classes.root}>
                <Paper square='true' elevation={3} className={classes.outerContainer}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Paper square='true' elevation={0} className={classes.headerContainer}>
                            <Typography className={classes.headerText}>Create New Question</Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} style={{paddingLeft: '30px', paddingRight: '30px'}}>
                        <Paper square='true' elevation={0} className={classes.innerContainer}>
                            <Typography className={classes.completeText}>Complete the question:</Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} style={{paddingLeft: '30px', paddingRight: '30px'}}>
                        <Paper square='true' elevation={0} className={classes.innerContainer}>
                            <Typography className={classes.wouldText}>Would you rather ...</Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} style={{paddingLeft: '30px', paddingRight: '30px'}}>
                        <Paper square='true' elevation={0}>
                            <TextField 
                                value={option1Text} 
                                id="outlined-basic-1" 
                                label="Enter Option-1 text here" 
                                variant="outlined" 
                                className={classes.innerContainer}
                                onChange={handleOptionChange(setOption1Text)}
                            />
                        </Paper>
                    </Grid>
                    <Grid item xs={12} style={{paddingLeft: '30px', paddingRight: '30px'}}>
                        <Paper square='true' elevation={0} className={classes.innerContainer}>
                            <div className={classes.dividerContainer}>
                                <div className={classes.dividerBorder} />
                                <Typography> Or </Typography>
                                <div className={classes.dividerBorder} />
                            </div>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} style={{paddingLeft: '30px', paddingRight: '30px'}}>
                        <Paper square='true' elevation={0}>
                            <TextField 
                                value={option2Text} 
                                id="outlined-basic-2" 
                                label="Enter Option-2 text here" 
                                variant="outlined" 
                                className={classes.innerContainer}
                                onChange={handleOptionChange(setOption2Text)}
                            />
                        </Paper>
                    </Grid>
                    <Grid item xs={12} style={{paddingLeft: '30px', paddingRight: '30px'}}>
                        <Paper square='true' elevation={0}>
                            <Button 
                                variant="contained" 
                                color="primary" 
                                className={classes.innerContainer} 
                                style={{marginBottom: '20px'}} 
                                disabled={!option1Text.trim() || !option2Text.trim()}
                                onClick={handleSubmit}
                            >
                                Submit
                            </Button>
                        </Paper>
                    </Grid>
                </Grid>
                </Paper>
            </Container>
        </React.Fragment>
    );
}

function mapStateToProps({authedUser}) {
    return {authedUser}
}

export default connect(mapStateToProps)(AddQuestion)
