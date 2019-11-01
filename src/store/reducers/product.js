import * as actionTypes from '../actions/actionsTypes';
import { updatedObject} from '../utility';


const initialState = {
    productRequestedId: null,
    madeRequested: null,
    modelRequested: null,
    priceRequested: null,



    madeAndModelsData: null,
    mostPopularProducts: null
}


const setProductRequestedData = (state, action) => {
    return updatedObject(state, {
        productRequestedId: action.productId,
        madeRequested: action.productMade,
        modelRequested: action.productModel,
        priceRequested: action.productPrice
    })
}

const reducer = ( state = initialState, action) => {
    switch (action.type){
        case actionTypes.SET_PRODUCT_REQUESTED_DATA : return setProductRequestedData(state, action);
        case actionTypes.SET_MADE_AND_MODELS_DATAS: return updatedObject( state, {madeAndModelsData: action.data });
        case actionTypes.SET_MOST_POPULAR_PRODUCTS: return updatedObject( state, { mostPopularProducts: action.products})
        default: return state
    }
}

export default reducer;