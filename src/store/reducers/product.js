import * as actionTypes from '../actions/actionsTypes';
import { updatedObject} from '../utility';


const initialState = {
    productRequestedId: null,
    madeRequested: null,
    modelRequested: null,
    priceRequested: null,



    brandAndModelsData: null,
    mostPopularProducts: null
}


const setProductRequestedData = (state, action) => {
    return updatedObject(state, {
        productRequestedId: action.productId,
        brandRequested: action.productBrand,
        modelRequested: action.productModel,
        priceRequested: action.productPrice
    })
}

const reducer = ( state = initialState, action) => {
    switch (action.type){
        case actionTypes.SET_PRODUCT_REQUESTED_DATA : return setProductRequestedData(state, action);
        case actionTypes.SET_BRAND_AND_MODELS_DATAS: return updatedObject( state, {brandAndModelsData: action.data });
        case actionTypes.SET_MOST_POPULAR_PRODUCTS: return updatedObject( state, { mostPopularProducts: action.products})
        default: return state
    }
}

export default reducer;