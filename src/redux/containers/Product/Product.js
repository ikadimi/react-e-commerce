import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { cleanProductPage, getProduct } from '../../actions/ProductsActions';
import Loading from '../../components/Loading/Loading';
import PageNotFound from '../../components/PageNotFound/PageNotFound';
import ProductInfo from '../../components/ProductInfo/ProductInfo';
import Suggestions from '../../components/Suggestions/Suggestions'

import './Product.css'

const Product = (props) => {
    const dispatch = useDispatch();
    const { loading, product, suggestions } = useSelector(state => state);


    useEffect(() => {
        if (props.match.params.category && props.match.params.id)
            dispatch(getProduct(props.match.params.category, props.match.params.id))

        return (() => {
            dispatch(cleanProductPage())
        })
             // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.match.params.category, props.match.params.id])

    return (
        <div>
            {!loading ? <div>
            {product ?  
            <div  id="productPageContainer">
                <ProductInfo product={product}/>
                {suggestions && <Suggestions suggestions={suggestions}/>}
            </div>
            : <PageNotFound />}
            </div> : <Loading />} 
        </div>
    );
}

export default Product;
