import * as actionTypes from './actionsTypes';


export const setProductRequestedData = data => {
    return {
        type: actionTypes.SET_PRODUCT_REQUESTED_DATA,
        data: data
    }
}

export const initAppData = data => {
    return {
        type: actionTypes.INIT_APP_DATA,
        data: data
    }
}

export const setInventoryCurrentPage = currentPage => {
    return {
        type: actionTypes.SET_INVENTORY_CURRENT_PAGE,
        currentPage: currentPage
    }
}
