import React from 'react';
import './HomeInventory.css';
import Button from '../../../components/button/Button';
import ProductsList from '../../../components/ProductsList/ProductsList';
import { FormattedMessage } from 'react-intl'

const homeInventory = props => {
    let productsList = props.carsHomeInventory;
    let homeInventoryLimit = props.homeInventoryLimit;

    if(homeInventoryLimit < productsList.length){
        productsList = productsList.slice(0, homeInventoryLimit)
    }
    return (
        <div className="home-inventory">
            <ProductsList productsList={productsList}/>
            <Button color="primary"
                    onClick={() => props.history.push('/inventory')}>
                <FormattedMessage id="seeMore" defaultMessage="see more"/>
            </Button>
        
        </div>
    )
}
export const HomeInventoryMemo = React.memo(homeInventory);