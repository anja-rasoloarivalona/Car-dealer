import React from 'react';
import './HomeInventory.css';
import Button from '../../../components/button/Button';
import ProductCard from '../../../components/ProductCard/ProductCard'
import * as actions from '../../../store/actions'
import { connect } from 'react-redux';

const homeInventory = props => {

    let cars = props.carsHomeInventory;


    const requestProductDetails = data => {
            props.setProductRequestedData(data)
            props.history.push(`/car/${data.productId}`)
    }

    return (
        <div className="home-inventory">
            <ul className="home-inventory__list">

            {
                cars.map(product => (

               <ProductCard 
                    key= {product._id}
                    _id = {product._id}
                    mainImgUrl={product.general[0].mainImgUrl}
                    made={product.general[0].made}
                    model={product.general[0].model}
                    year={product.general[0].year}
                    price={product.general[0].price}
                    nbKilometers={product.general[0].nbKilometers}
                    gazol={product.general[0].gazol}
                    transmissionType={product.general[0].transmissionType}
                    requestProductDetails={requestProductDetails}
                />
                    )
                )
            }
            </ul>

            <Button color="primary"
                    onClick={() => props.history.push('/inventaire')}>
                Voir plus
            </Button>
        
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        setProductRequestedData: data => dispatch(actions.setProductRequestedData(data))
    }
}

export const HomeInventoryMemo = connect(null, mapDispatchToProps)(React.memo(homeInventory));