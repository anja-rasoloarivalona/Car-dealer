import React, { Component } from 'react'
import './Account.css';
import { connect } from 'react-redux';
import ProductCard from '../../components/ProductCard/ProductCard';
import * as actions from '../../store/actions'
class Account extends Component {


    state = {
        loading: true
    }

    requestProductDetails = data => {
        this.props.setProductRequestedData(data)
        this.props.history.push(`/car/${data.productId}`)
    }
    
    render() {

        let products = this.props.favorites

        return (
            <div className="account">
                  <span>account</span>  

                  <ul className="account__productList">
                        {
                            products && products.map(product => (
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
                                            requestProductDetails={this.requestProductDetails.bind(this)}
                                        />
                                        )
                                    )
                        }
                  </ul>

                  
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        userId: state.auth.userId,

        favorites: state.user.favorites
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setProductRequestedData : data =>  dispatch(actions.setProductRequestedData(data)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Account)
