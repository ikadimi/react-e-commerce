import axios from 'axios'

import { SET_PRODUCTS, SET_PRODUCT, SET_INITIAL_PRODUCTS, SET_CHART, SET_LOADING } from "."

export const setLoading = (payload) => {
    return {
        type: SET_LOADING,
        payload
    }
}

export const setCart = (payload) => {
    return {
        type: SET_CHART,
        payload
    }
}

export const setProduct = (payload) => {
    return {
        type: SET_PRODUCT,
        payload
    }
}

export const setProducts = (payload) => {
    return {
        type: SET_PRODUCTS,
        payload
    }
}

export const setInitialProducts = (payload) => {
    return {
        type: SET_INITIAL_PRODUCTS,
        payload
    }
}

export  const ratingToArray = (number) => {
    const arr = new Array(5).fill(0)

    for (let i = 0; i < 5; i++)
    {
        if (number >= 1)
            arr[i] = 1;
        else if (number > 0)
            arr[i] = 0.5;
        number--;
    }
    return arr;
}

const filterMachine = (products, filters) => {
    const regex = new RegExp(filters.search, "i");

    if (filters.category === 'category' && filters.shipping === 'shipping')
        return products.filter(product => regex.test(product.title) && product.price >= filters.price && product.rating >= filters.rating);
    if (filters.category === 'category' && filters.shipping !== 'shipping')
        return products.filter(product => regex.test(product.title) && product.shipping === filters.shipping && product.price >= filters.price && product.rating >= filters.rating);
    else if (filters.shipping === 'shipping' && filters.category !== 'category')
        return products.filter(product => regex.test(product.title) && product.category === filters.category && product.price >= filters.price && product.rating >= filters.rating);
    else
        return products.filter(product => regex.test(product.title) && product.category === filters.category && product.shipping === filters.shipping && product.price >= filters.price && product.rating >= filters.rating);
}

export const addToCart = ({product, quantity}) => (dispatch, getState) => {
    const { cart } = getState();
    const newCart = [];
    const len = cart.length;

    if (!cart.some(item => item.product.category === product.category && item.product.id === product.id))
        dispatch(setCart([...cart, {product, quantity}]))
    else {
        for (let i = 0; i < len; i++)
        {
            if (cart[i].product.category === product.category && cart[i].product.id === product.id)
                newCart.push({product: cart[i].product, quantity: cart[i].quantity + quantity})
            else
                newCart.push(cart[i])
        }
        dispatch(setCart(newCart))
    }
}

export const removeFromCart = (product) => (dispatch, getState) => {
    const { cart } = getState();

    dispatch(setCart(cart.filter(item => item.product.category !== product.category || item.product.id !== product.id)))
}

export const filterProducts = (filters) => {
    return (dispatch, getState) => {
        const { initialProducts } = getState();
        
        dispatch(setProducts(filterMachine(initialProducts, filters)));
    }
}

export const getProduct = (category, id) => {
    return (dispatch) => {
        dispatch(setLoading(true));

        axios.get(`http://localhost:3000/products?category=${category}&id=${id}`)
        .then(res => {
            dispatch(setLoading(false));
            dispatch(setProduct(res.data[0]));
            dispatch(getProducts());
        })
        .catch(err => {
            console.log(err)
            dispatch(setLoading(false));
        })
    }
}

export const getProducts = () => {
    return (dispatch) => {
        dispatch(setLoading(true));

        axios.get("http://localhost:3000/products")
        .then(res => {
            dispatch(setLoading(false));
            dispatch(setInitialProducts(res.data));
        })
        .catch(err => {
            console.log(err);
            dispatch(setLoading(false));
        })
    }
}