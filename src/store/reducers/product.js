import * as actionTypes from '../actions/actionsTypes';
import { updatedObject} from '../utility';


const initialState = {
    productRequestedId: null
}

const reducer = ( state = initialState, action) => {
    switch (action.type){
        case actionTypes.SET_PRODUCT_REQUESTED_ID : return updatedObject(state, {productRequestedId: action.productRequestedId});

        default: return state
    }
}

export default reducer;