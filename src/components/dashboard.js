import React, {useState} from 'react'
import {connect} from 'react-redux'
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Avatar from '@material-ui/core/Avatar'

import QuestionsList from './questionslist'
import AddQuestion from './addquestion'
import LeaderBoard from './leaderboard'
import QuestionView from './questionview'
import {Redirect} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    avatarHello: {
        marginTop: '5px'
    },
    helloMessage: {
        paddingLeft: '10px'
    },
    logoutBtn: {
        marginTop: '10px'
    }
}));

const Dashboard = (props) => {
    const classes = useStyles()
    const {loggedInUser, initialTab} = props
    
    let selectedTab = initialTab || 0
    const [redirect, setRedirect] = useState()

    const tabURIMap = {
        '0': '/',
        '1': '/add',
        '2': '/leaderboard'
    }

    const [questionId, setQuestionId] = useState(props.match.params.questionId)
    if (questionId) {
        selectedTab = 3
    }

    const handleTopNavChange = (event, newValue) => {
        setQuestionId(null)
        setRedirect(tabURIMap[newValue])
    }

    const handleLogout = () => {
        setRedirect('/signin')
    }

    if (redirect) {
        return (<Redirect to={redirect} />)
    }

    return (
        <div>
            <Grid container spacing={0}>
                <Grid item xs={9}>
                    <Paper square elevation={0}>
                        <Tabs
                            value={selectedTab}
                            indicatorColor="primary"
                            textColor="primary"
                            onChange={handleTopNavChange}
                            aria-label="disabled tabs example"
                        >
                            <Tab key="Home" label="Home" />
                            <Tab key="New Question" label="New Question" />
                            <Tab key="Leader Board" label="Leader Board" />
                            {questionId && (<Tab key={`Question: ${questionId}`} label={'Question'} />)}
                        </Tabs>
                    </Paper>
                </Grid>
                <Grid item xs={3}>
                    <Grid container spacing={0}>
                        <Grid item xs={1} className={classes.avatarHello}>
                            <Avatar alt={loggedInUser.name} src={loggedInUser.avatarURL} className={classes.small} />
                        </Grid>
                        <Grid item xs={6}>
                            <p className={classes.helloMessage}>Hello, {loggedInUser.name}</p>
                        </Grid>
                        <Grid item xs={5}>
                            <Button 
                                className={classes.logoutBtn} 
                                variant="contained" 
                                color="inherit"
                                onClick={handleLogout}
                            >
                                Logout
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            {selectedTab === 0 && (<QuestionsList />)}
            {selectedTab === 1 && (<AddQuestion />)}
            {selectedTab === 2 && (<LeaderBoard />)}
            {selectedTab === 3 && (<QuestionView questionId={questionId} />)}
        </div>
    )
}

function mapStateToProps({users, authedUser}, props) {
    return {
        ...props,
        loggedInUser: users[authedUser]
    }
}

export default connect(mapStateToProps)(Dashboard)