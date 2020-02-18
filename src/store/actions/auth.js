import * as actionTypes from './actionsTypes';



export const loginSucceeded = data => {
    return {
        type: actionTypes.LOGIN_SUCCEDED,
        token: data.token,
        userId: data.userId,
        connectionId: data.connectionId,
        userName: data.userName

    }
}

export const loginFailed = () => {
    return {
        type: actionTypes.LOGIN_FAILED
    }
}

export const setLoginStateToTrue = data => {
    return {
        type: actionTypes.SET_LOGIN_STATE_TO_TRUE,
        isAuth: data.isAuth,
        token: data.token,
        userId: data.userId,
        userName: data.userName
        
    }
}

export const setLoginStateToFalse = () => {
    return {
        type: actionTypes.SET_LOGIN_STATE_TO_FALSE
    }
}

export const setConnectionId = data => {
    return {
        type: actionTypes.SET_CONNECTION_ID,
        connectionId: data
    }
}
