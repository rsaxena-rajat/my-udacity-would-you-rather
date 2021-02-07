import React, {useState} from 'react'
import {connect} from 'react-redux'
import {makeStyles} from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Avatar from '@material-ui/core/Avatar'
import {Typography, LinearProgress} from '@material-ui/core'
import {Redirect} from 'react-router-dom'

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
    },
    questionText: {
        marginRight: '10px',
        marginLeft: '10px',
        fontWeight: 'bold'
    },
    statsText: {
        marginRight: '10px',
        marginLeft: '10px',
        fontWeight: 'bold',
        fontSize: '100%',
        textAlign: 'center'
    }
}));

const QuestionResults = (props) => {
    const classes = useStyles()
    const {question, askedByUser, loggedInUser} = props
    console.log(question)

    const totalVotes = question.optionOne.votes.length + question.optionTwo.votes.length
    const votedByLoggedInUser = question.optionOne.votes.includes(loggedInUser)
        ? 'optionOne'
        : 'optionTwo'

    const [redirect, setRedirect] = useState(false)

    if (redirect) {
        return (<Redirect to={`/questions/${question.id}`} />)
    }

    return (
        <Grid item className={classes.root}>
            <Grid container spacing={0} direction="column" justify="center" alignItems="center">
                <Grid key='question-head' item className={classes.questionCard}>
                    <Paper square={true} className={classes.questionTitleContainer} elevation={1}>
                        <span className={classes.questionTitleText}>{askedByUser.name} asks:</span>
                    </Paper>
                </Grid>
                <Grid key='question-card' item className={classes.questionCard}>
                    <Grid item xs={12}>
                        <Grid container justify="center" spacing={0}>
                            <Grid key='question-avatar' item xs={4}>
                                <Paper square={true} elevation={1} className={classes.avatarImageContainer} style={{height: '220px'}}>
                                    <Avatar alt={question.id} src={askedByUser.avatarURL} className={classes.avatarImage} />
                                </Paper>
                            </Grid>
                            <Grid key='question-details' item xs={8}>
                                <Paper square={true} elevation={1}>
                                    <Grid container spacing={1} style={{height: '100%'}}>
                                        <Grid item xs={12}>
                                            <Typography variant="h6">Results:</Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Grid container spacing={1}>
                                                <Grid item xs={12}>
                                                    <Typography className={classes.questionText}>Would you rather {question.optionOne.text} ?</Typography>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <LinearProgress variant="determinate" value={question.optionOne.votes.length * 100 / totalVotes} style={{minHeight: '10px', marginLeft: '10px', marginRight: '10px'}}/>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Typography className={classes.statsText}>
                                                    {
                                                        `${question.optionOne.votes.length} out of ${totalVotes} votes${votedByLoggedInUser === 'optionOne' ? ' including you': ''}`
                                                    }
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography style={{textAlign: 'center'}}>---------------------------------------</Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Grid container spacing={1}>
                                                <Grid item xs={12}>
                                                    <Typography className={classes.questionText}>Would you rather {question.optionTwo.text} ?</Typography>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <LinearProgress variant="determinate" value={question.optionTwo.votes.length * 100 / totalVotes} style={{minHeight: '10px', marginLeft: '10px', marginRight: '10px'}}/>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Typography className={classes.statsText}>
                                                    {
                                                        `${question.optionTwo.votes.length} out of ${totalVotes} votes${votedByLoggedInUser === 'optionTwo' ? ' including you': ''}`
                                                    }
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

function mapStateToProps({authedUser, users}, {question}) {
    return {
        question,
        loggedInUser: authedUser,
        askedByUser: users[question.author]
    }
}

export default connect(mapStateToProps)(QuestionResults)