import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Avatar from '@material-ui/core/Avatar'
import { Button } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    root: {
        paddingTop: '10px'
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
}));

const Question = props => {
    const classes = useStyles()
    const {question, askedByUser} = props

    const handleViewPollClick = () => {}

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
                                    <ul>
                                        <li key={`${question.id}-optionOne`} className={classes.optionText}>{question.optionOne.text}</li>
                                        <li key={`${question.id}-optionTwo`} className={classes.optionText}>{question.optionTwo.text}</li>
                                    </ul>
                                    <Button 
                                        variant="outlined" 
                                        color="primary" 
                                        className={classes.viewPollButton}
                                        onClick={handleViewPollClick}
                                    >
                                        View Poll
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

export default Question