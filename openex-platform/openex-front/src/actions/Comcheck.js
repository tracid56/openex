import * as schema from './Schema'
import {getReferential, postReferential, delReferential} from '../utils/Action'

export const fetchComchecks = (exerciseId, noloading) => (dispatch) => {
    let uri = '/api/exercises/' + exerciseId + '/comchecks'
    return getReferential(schema.arrayOfComchecks, uri, noloading)(dispatch)
}

export const fetchComcheck = (exerciseId, comcheckId, noloading) => (dispatch) => {
    let uri = '/api/exercises/' + exerciseId + '/comchecks/' + comcheckId
    return getReferential(schema.comcheck, uri, noloading)(dispatch)
}

export const addComcheck = (exerciseId, data) => (dispatch) => {
    let uri = '/api/exercises/' + exerciseId + '/comchecks'
    return postReferential(schema.comcheck, uri, data)(dispatch)
}

export const deleteComcheck = (exerciseId, comcheckId) => (dispatch) => {
    let uri = '/api/exercises/' + exerciseId + '/comchecks/' + comcheckId
    return delReferential(uri, 'comchecks', comcheckId)(dispatch)
}

export const fetchComcheckStatuses = (exerciseId, comcheckId, noloading) => (dispatch) => {
    let uri = '/api/exercises/' + exerciseId + '/comchecks/' + comcheckId + '/statuses'
    return getReferential(schema.arrayOfComcheckStatuses, uri, noloading)(dispatch)
}

export const fetchComcheckStatus = (statusId) => (dispatch) => {
    let uri = '/api/anonymous/comcheck/' + statusId
    return getReferential(schema.comcheckStatus, uri)(dispatch)
}