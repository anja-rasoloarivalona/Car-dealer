import * as actionTypes from './actionsTypes';


export const setProductRequestedId = id => {
    return {
        type: actionTypes.SET_PRODUCT_REQUESTED_ID,
        productRequestedId: id
    }
}