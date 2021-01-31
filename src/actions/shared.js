import {getInitialData} from '../data/api'
import {showLoading, hideLoading} from 'react-redux-loading'

import {receiveUsers} from './users'
import {receiveQuestions} from './questions'

export const handleInitialData = () => (dispatch) => {
    dispatch(showLoading())   
    return getInitialData().then(({users, questions}) => {
        dispatch(receiveUsers(users))
        dispatch(receiveQuestions(questions))
        dispatch(hideLoading())
    })
}