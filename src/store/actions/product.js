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


export const setMadeAndModelsData = data => {

    console.log('datata', data)
    return {
        type: actionTypes.SET_MADE_AND_MODELS_DATAS,
        data: data
    }
}