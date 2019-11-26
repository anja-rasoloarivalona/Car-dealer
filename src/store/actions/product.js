import * as actionTypes from './actionsTypes';


export const setProductRequestedData = prodData => {
    return {
        type: actionTypes.SET_PRODUCT_REQUESTED_DATA,
        productId: prodData.productId,
        productBrand: prodData.productBrand,
        productModel: prodData.productModel,
        productPrice: prodData.productPrice
    }
}


export const setBrandAndModelsData = data => {

    console.log('setting my data')
    return {
        type: actionTypes.SET_BRAND_AND_MODELS_DATAS,
        data: data
    }
}

export const setMostPopularProducts = products => {
    return {
        type: actionTypes.SET_MOST_POPULAR_PRODUCTS,
        products: products
    }
}