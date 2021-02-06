import React from 'react'
import {connect} from 'react-redux'

const AnswerQuestion = (props) => {
    const {question} = props

    return (
        <div>Answer The question: {JSON.stringify(question)}</div>
    )
}

function mapStateToProps({}, {question}) {
    return {
        question
    }
}

export default connect(mapStateToProps)(AnswerQuestion)