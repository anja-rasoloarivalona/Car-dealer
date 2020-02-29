import * as actionTypes from '../actions/actionsTypes';
import { updatedObject} from '../utility';

const initialState = {
   newMessage: 0
}

const reducer = (state = initialState, action) => {
    switch (action.type){
        case actionTypes.ADD_A_NEW_MESSAGE_NOTIFICATION: return updatedObject(state, {newMessage: state.newMessage + action.data});
        case actionTypes.RESET_NEW_MESSAGE_NOTIFICATION: return updatedObject(state, {newMessage: 0 });
        default: return state
    }
}

export default reducer