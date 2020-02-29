import * as actionTypes from './actionsTypes';


export const addNewMessageNotification = data=> {
    return {
        type: actionTypes.ADD_A_NEW_MESSAGE_NOTIFICATION,
        data: data
    }
}

export const resetNewMessageNotification = () => {
    return {
        type: actionTypes.RESET_NEW_MESSAGE_NOTIFICATION
    }
}