import * as actionTypes from '../actions/actionsTypes';
import { updatedObject} from '../utility';


const initialState = {
    brandAndModelsData: null,
    mostPopularProducts: null,
    productRequested: null
}

const reducer = ( state = initialState, action) => {
    switch (action.type){
        case actionTypes.SET_PRODUCT_REQUESTED_DATA : return updatedObject(state, { productRequested: action.data});
        case actionTypes.SET_BRAND_AND_MODELS_DATAS: return updatedObject( state, {brandAndModelsData: action.data });
        case actionTypes.SET_MOST_POPULAR_PRODUCTS: return updatedObject( state, { mostPopularProducts: action.products})
        default: return state
    }
}

export default reducer;