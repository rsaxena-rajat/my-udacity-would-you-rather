import {showLoading, hideLoading} from 'react-redux-loading'
import {saveQuestion, saveQuestionAnswer, getInitialData} from '../data/api'
import {receiveUsers} from './users'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'

export const receiveQuestions = (questions) => ({
    type: RECEIVE_QUESTIONS,
    questions
})

export function handleAddQuestion({optionOneText, optionTwoText, author}) {
    let addedQuestion = null;
    return (dispatch) => {
        dispatch(showLoading())
        return saveQuestion({optionOneText, optionTwoText, author})
            .then((question) => {
                addedQuestion = question
                return getInitialData()
            })
            .then(({users, questions}) => {
                dispatch(receiveUsers(users))
                dispatch(receiveQuestions(questions))
                dispatch(hideLoading())
                return addedQuestion
            })
    }
}

export function handleAddQuestionAnswer({authedUser, qid, answer}) {
    return (dispatch) => {
        dispatch(showLoading())
        return saveQuestionAnswer({authedUser, qid, answer})
            .then(() => getInitialData())
            .then(({users, questions}) => {
                dispatch(receiveUsers(users))
                dispatch(receiveQuestions(questions))
                dispatch(hideLoading())
            })
    }
} 