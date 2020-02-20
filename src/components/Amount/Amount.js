import React from 'react'
import { connect } from 'react-redux'
import './Amount.css'


const Amount = props => {
   let USDCAD = props.quotes.USDCAD
   let USDEUR = props.quotes.USDEUR


        let currency = props.currency;    
        let amount = props.amount;
    
        if(currency === 'USD'){
            amount = amount / USDCAD
        }

        if(currency === 'EUR'){
            amount = amount / USDCAD * USDEUR
        }

        return (
            <div className="amount">
                <span className="amount__value">{Math.ceil(amount).toLocaleString()}</span> {props.showCurrency ? <span className="amount__currency">{currency}</span> : ''}  
            </div>
        )
}



const mapStateToProps = state => {
    return {
        currency: state.parameters.currency,
        quotes: state.parameters.quotes
    }
}


export default connect(mapStateToProps)(Amount)