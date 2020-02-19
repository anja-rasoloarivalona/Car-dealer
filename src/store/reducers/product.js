import * as actionTypes from '../actions/actionsTypes';
import { updatedObject} from '../utility';


const initialState = {
    brandAndModelsData: null,
    mostPopularProducts: null,
    price: null,
    mostPopularSedan: null,
    productRequested: null,
    bodyTypeList: null
    
}

const initAppData = (state, action) => {
    return updatedObject(state, {
        brandAndModelsData: action.data.brandAndModelsData,
        mostPopularProducts: action.data.mostPopularProducts,
        price: action.data.price,
        mostPopularSedan: action.data.mostPopularSedan,
        bodyTypeList: action.data.bodyTypeList
    })
}



const reducer = ( state = initialState, action) => {
    switch (action.type){
        case actionTypes.SET_PRODUCT_REQUESTED_DATA : return updatedObject(state, { productRequested: action.data});
        case actionTypes.INIT_APP_DATA: return initAppData(state, action);
        default: return state
    }
}

export default reducer;