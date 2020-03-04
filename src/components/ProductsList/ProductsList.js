import React from 'react';
import './ProductsList.css';
import ProductCard from '../ProductCard/ProductCard';
import * as actions from '../../store/actions';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom'

const ProductsList = props => {
    const requestProductDetails = data => {
        props.setProductRequestedData(data);

        props.history.push(`/inventory/${data._id}?bodyType=${data.general.bodyType}&brand=${data.general.brand}&model=${data.general.model}&currency=${props.currency}&lang=${props.lang}&price=${data.general.price}`); 

        if(props.fetchProductDetailsHandler){
            props.fetchProductDetailsHandler(data)
        }     
    }
    let productsList = props.productsList;
    return (
        <ul className="products-list">
            {productsList.map(product => (
                <li key={product._id} className="products-list__item">
                    <ProductCard 
                        id={product._id}
                        mainImg={product.general.mainImgUrl}
                        title={product.general.title}
                        brand={product.general.brand}
                        model={product.general.model}
                        year={product.general.year}
                        price={product.general.price}
                        nbKilometers={product.general.nbKilometers}
                        gazol={product.general.gazol}
                        transmissionType={product.general.transmissionType}
                        requestProductDetails={() => requestProductDetails(product)}
                    />
                </li>
            ))}
        </ul>
    )
}

const mapStateToProps = state => {
    return {
        currency: state.parameters.currency,
        lang: state.parameters.lang,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setProductRequestedData: data => dispatch(actions.setProductRequestedData(data)) 
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(ProductsList)) 
