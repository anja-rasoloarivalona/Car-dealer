import * as actionTypes from './actionsTypes';


export const setProductRequestedData = prodData => {
    return {
        type: actionTypes.SET_PRODUCT_REQUESTED_DATA,
        productId: prodData.productId,
        productMade: prodData.productMade,
        productModel: prodData.productModel,
        productPrice: prodData.productPrice
    }
}