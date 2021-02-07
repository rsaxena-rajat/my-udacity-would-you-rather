import React from 'react'
import {connect} from 'react-redux'
import {makeStyles} from '@material-ui/core/styles'
import UserScoreCard from './userscorecard'

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      marginTop: '100px'
    },
    paper: {
      padding: theme.spacing(1),
      margin: 'auto',
      maxWidth: 600,
    },
    avatar: {
        width: theme.spacing(9),
        height: theme.spacing(9),
        margin: 'auto'
    },
    avatarContainer: {
        marginTop: '5px',
        width: '150px',
        display: 'flex'
    },
    dividerContainer: {
        display: "flex",
        alignItems: "center"
    },
    dividerBorder: {
        borderBottom: "1px solid lightgray",
        width: "100%"
    },
    userText: {
        fontWeight: 'bold',
        fontSize: '150%'
    },
    rankText: {
        fontWeight: 'bold',
        fontSize: '100%'
    },
    scoreTextContainer: {
        marginTop: '30px', 
        marginLeft: '20px', 
        marginRight: '20px', 
        height: '50px',
        textAlign: 'center',
        backgroundColor: '#e0e0e0'
    },
    scoreContainer: {
        marginLeft: '20px', 
        marginRight: '20px', 
        marginTop: 'auto',
        marginBottom: 'auto',
        height: '80px',
        textAlign: 'center'
    },
}));

const _scoreForUser = (user) => user.questions.length + Object.keys(user.answers).length

const LeaderBoard = (props) => {
    const classes = useStyles();
    const {users} = props
    const sortedUserIds = Object.keys(users).sort((a, b) => _scoreForUser(users[b]) - _scoreForUser(users[a]))
    return(
        <div className={classes.root}>
            {sortedUserIds.map((userId, index) => (
                <div key={userId}>
                    <UserScoreCard 
                        name={users[userId].name}
                        avatarURL={users[userId].avatarURL}
                        answeredCount={Object.keys(users[userId].answers).length}
                        askedCount={users[userId].questions.length}
                        rank={index + 1}
                        score={_scoreForUser(users[userId])}
                    />
                <br />
                </div>
            ))}
        </div>
    )
}


function mapStateToProps({users}) {
    return {users}
}

export default connect(mapStateToProps)(LeaderBoard)