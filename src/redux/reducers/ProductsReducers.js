import { SET_PRODUCTS, SET_INITIAL_PRODUCTS, SET_PRODUCT, SET_CHART, SET_LOADING } from "../actions";

const initialState = {
    initialProducts: [],
    products: [],
    product: null,
    loading: true,
    cart: []
}

const ProductsReducers = (state = initialState, {type, payload}) => {
    switch (type)
    {
        case SET_LOADING:
            return {
                ...state,
                loading: payload
            }
        case SET_CHART:
            return {
                ...state,
                cart: payload
            }
        case SET_PRODUCT:
            return {
                ...state,
                product: payload
            }
        case SET_INITIAL_PRODUCTS:
            return {
                ...state,
                initialProducts: payload,
                products: payload
            }
        case SET_PRODUCTS:
            return {
                ...state,
                products: payload
            }
        default:
            return state;
    }
}

export default ProductsReducers