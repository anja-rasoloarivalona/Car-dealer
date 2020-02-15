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
            props.history.push(`/car/${data._id}`)
    }

    return (
        <div className="home-inventory">
            <ul className="home-inventory__list">

            {cars.map(product => (
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