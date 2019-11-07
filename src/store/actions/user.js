import * as actionTypes from './actionsTypes';

export const setUserFavoriteProducts = products => {
    return {
        type: actionTypes.SET_USER_FAVORITE_PRODUCTS,
        favorites: products
    }
}

export const addUserFavoriteProduct = product => {
    return {
        type: actionTypes.ADD_USER_FAVORITE_PRODUCT,
        product: product
    }
}

export const removeUserFavoriteProduct = product => {
    return {
        type: actionTypes.REMOVE_USER_FAVORITE_PRODUCT,
        product: product
    }
}