import React from 'react'
import {connect} from 'react-redux'

import AnswerQuestion from './answerquestion'
import QuestionResults from './questionresults'

const QuestionView = (props) => {
    const {question, loggedInUser} = props

    return (
        <div>
            {loggedInUser.answers[question.id]
                ? <QuestionResults question={question} />
                : <AnswerQuestion question={question} />
            }
        </div>
    )
}

function mapStateToProps({questions, authedUser, users}, {questionId}) {
    return {
        question: questions[questionId],
        loggedInUser: users[authedUser]
    }
}

export default connect(mapStateToProps)(QuestionView)