import * as actionTypes from '../actions/actionsTypes';
import { updatedObject } from '../utility'


const initialState = {
    favorites: []
}


const addFavoriteProduct = (state, action) => {
    return updatedObject(state, {
        favorites: [...state.favorites, action.product]
    })
}

const removeFavoriteProduct = (state, action) => {
    let newFavoritesData = state.favorites.filter( i => i._id !== action.product._id)
    return updatedObject(state, {
        favorites: newFavoritesData
    })
}

const reducer = (state = initialState, action) => {
    switch (action.type){
        case actionTypes.SET_USER_FAVORITE_PRODUCTS: return updatedObject(state, {favorites: action.favorites});
        case actionTypes.ADD_USER_FAVORITE_PRODUCT: return addFavoriteProduct(state, action);
        case actionTypes.REMOVE_USER_FAVORITE_PRODUCT: return removeFavoriteProduct(state, action)
        
        default: return state
    }
}

export default reducer