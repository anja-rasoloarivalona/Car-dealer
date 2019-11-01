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

    console.log('setting my data')
    return {
        type: actionTypes.SET_MADE_AND_MODELS_DATAS,
        data: data
    }
}

export const setMostPopularProducts = products => {
    return {
        type: actionTypes.SET_MOST_POPULAR_PRODUCTS,
        products: products
    }
}