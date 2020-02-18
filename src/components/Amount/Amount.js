import React from 'react'
import { connect } from 'react-redux'
import './Amount.css'


const Amount = props => {
    let USDCAD = 1.32359;
        let currency = props.currency;    
        let amount = props.amount;
    
        if(currency === 'USD'){
            amount = amount / USDCAD
        }
    
        return (
            <div className="amount">
                <span>{Math.ceil(amount).toLocaleString()}</span> <span>{currency}</span> 
            </div>
        )
}



const mapStateToProps = state => {
    return {
        currency: state.parameters.currency
    }
}


export default connect(mapStateToProps)(Amount)