import React from 'react'
import {connect} from 'react-redux'

const QuestionView = (props) => {
    const {question} = props

    return (
        <div>Question View: {JSON.stringify(question)}</div>
    )
}

function mapStateToProps({questions}, {questionId}) {
    return {
        question: questions[questionId]
    }
}

export default connect(mapStateToProps)(QuestionView)