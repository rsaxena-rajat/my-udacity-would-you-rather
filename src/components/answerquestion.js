import React, {useState} from 'react'
import {connect} from 'react-redux'
import {makeStyles} from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Avatar from '@material-ui/core/Avatar'
import {Button, FormControl, FormControlLabel, Radio, RadioGroup} from '@material-ui/core'
import {Redirect} from 'react-router-dom'

import {handleAddQuestionAnswer} from '../actions/questions'

const useStyles = makeStyles((theme) => ({
    root: {
        paddingTop: '100px'
    },
    questionTitleContainer: {
        height: '20px',
        width: '500px',
        textAlign: 'left',
        backgroundColor: '#e0e0e0',
        padding: '5px 0px 5px 0px;'
    },
    questionTitleText: {
        fontWeight: 'bold',
        paddingLeft: '10px'
    },
    questionCard: {
        width: '500px',
        paddingTop: '5px',
    },
    optionText: {
        fontSize: '80%'
    },
    viewPollButton: {
        width: '100%',
    },
    wouldYouRatherText: {
        fontWeight: 'bold',
    },
    avatarImageContainer: {
        height: '100%',
        display: 'flex'
    },
    avatarImage: {
        margin: 'auto',
        width: theme.spacing(9),
        height: theme.spacing(9),
    },
    form: {
        marginTop: '20px',
        marginBottom: '20px',
        marginLeft: '10px',
        width: '100%'
    }
}));

const AnswerQuestion = (props) => {
    const classes = useStyles()
    const {question, askedByUser, authedUser, dispatch} = props
    const [redirect, setRedirect] = useState(false)

    const handleClick = (e) => {
        e.preventDefault()
        dispatch(handleAddQuestionAnswer({
            authedUser,
            qid: question.id,
            answer: selection
        }))
        setRedirect(true)
    }

    const [selection, setSelection] = useState('optionOne')
    const handleChange = (event) => {
        setSelection(event.target.value)
    }

    if (redirect) {
        return (<Redirect to={`/questions/${question.id}`} />)
    }

    return (
        <Grid item className={classes.root}>
            <Grid container spacing={0} direction="column" justify="center" alignItems="center">
                <Grid key='question-head' item className={classes.questionCard}>
                    <Paper square className={classes.questionTitleContainer} elevation={1}>
                        <span className={classes.questionTitleText}>{askedByUser.name} asks:</span>
                    </Paper>
                </Grid>
                <Grid key='question-card' item className={classes.questionCard}>
                    <Grid item xs={12}>
                        <Grid container justify="center" spacing={0}>
                            <Grid key='question-avatar' item xs={4}>
                                <Paper square elevation={1} className={classes.avatarImageContainer}>
                                    <Avatar alt={question.id} src={askedByUser.avatarURL} className={classes.avatarImage} />
                                </Paper>
                            </Grid>
                            <Grid key='question-details' item xs={8}>
                                <Paper square elevation={1}>
                                    <span className={classes.wouldYouRatherText}>Would you rather</span>
                                    <FormControl component="fieldset" className={classes.form} >
                                        <RadioGroup aria-label="options" name="options" value={selection} onChange={handleChange}>
                                            <FormControlLabel value="optionOne" control={<Radio />} label={question.optionOne.text} />
                                            <FormControlLabel value="optionTwo" control={<Radio />} label={question.optionTwo.text} />
                                        </RadioGroup>
                                    </FormControl>
                                    <Button 
                                        variant="outlined" 
                                        color="primary" 
                                        className={classes.viewPollButton}
                                        onClick={handleClick}
                                    >
                                        Submit
                                    </Button>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

function mapStateToProps({users, authedUser}, {question}) {
    return {
        question,
        askedByUser: users[question.author],
        authedUser
    }
}

export default connect(mapStateToProps)(AnswerQuestion)