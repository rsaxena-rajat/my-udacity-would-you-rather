import React, {useState} from 'react'
import {connect} from 'react-redux'
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Grid from '@material-ui/core/Grid'
import Question from './question';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: 60
    },
    questionTagTab: {
        width: '600px'
    },
    questionsListContainer: {
        width: '600px'
    }
}));

const QuestionsList = props => {
    const classes = useStyles()
    const [selectecTab, setSelectedTab] = useState(0)
    const handleQuestionListChange = (event, newValue) => {
        setSelectedTab(newValue)
    }
    const {questions, loggedInUser, users} = props

    let answeredQues = []
    let unansweredQues = []
    
    Object.keys(questions).forEach(quesId => {
        const ques = questions[quesId]
        if (ques.optionOne.votes.includes(loggedInUser.id) || ques.optionTwo.votes.includes(loggedInUser.id)) {
            answeredQues.push(ques)
        } else {
            unansweredQues.push(ques)
        }
    })

    answeredQues = answeredQues.sort((b, a) => a.timestamp - b.timestamp)
    unansweredQues = unansweredQues.sort((b, a) => a.timestamp - b.timestamp)
    
    return (
        <Grid item className={classes.root}>
            <Grid container spacing={0} direction="column" justify="center" alignItems="center">
                <Grid key='tabs-question-head' item>
                    <Paper square elevation={1}>
                        <Tabs
                            value={selectecTab}
                            indicatorColor="primary"
                            textColor="primary"
                            onChange={handleQuestionListChange}
                            variant="fullWidth"
                            className={classes.questionTagTab}
                        >
                                <Tab label="Unanswered Questions" />
                                <Tab label="Answered Questions" />
                        </Tabs>
                    </Paper>
                </Grid>
                <Grid key='questions-list' item>
                    <Paper square elevation={1} className={classes.questionsListContainer}>
                    {
                        (selectecTab ? answeredQues : unansweredQues).map(ques => (
                            <Grid key={`questions-list-${ques.id}`} item>
                                <Question question={ques} askedByUser={users[ques.author]} category={selectecTab ? 'answered' : 'unanswered'}/>
                            </Grid>
                        ))
                    }
                    </Paper>
                </Grid>
            </Grid>
        </Grid>
    )
}

function mapStateToProps({questions, authedUser, users}) {
    return {
        loggedInUser: users[authedUser],
        questions,
        users
    }
}

export default connect(mapStateToProps)(QuestionsList)