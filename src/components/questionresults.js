import React from 'react'
import {connect} from 'react-redux'

const QuestionResults = (props) => {
    const {question} = props

    return (
        <div>Question Results: {JSON.stringify(question)}</div>
    )
}

function mapStateToProps({}, {question}) {
    return {
        question
    }
}

export default connect(mapStateToProps)(QuestionResults)