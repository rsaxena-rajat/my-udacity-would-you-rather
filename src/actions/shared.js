import {getInitialData} from '../data/api'
import {showLoading, hideLoading} from 'react-redux-loading'

import {receiveUsers} from './users'

export const handleInitialData = () => (dispatch) => {
    dispatch(showLoading())   
    return getInitialData().then(({users}) => {
        dispatch(receiveUsers(users))
        dispatch(hideLoading())
    })
}