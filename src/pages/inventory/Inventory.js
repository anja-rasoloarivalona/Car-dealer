import React, { Component } from 'react'
import './Inventory.css';
import ProductCard from '../../components/ProductCard/ProductCard';
import {connect} from 'react-redux'
import * as actions from '../../store/actions';


class Inventory extends Component {

    state = {
        products: null
    }

    componentDidMount(){
        this.fetchProductsHandler()
    }

    fetchProductsHandler = () => {
        let url = 'http://localhost:8000/product';
        let method = 'GET';
  
        fetch( url, {
          method: method,
          headers: {
            'Content-type': 'application/json'
          }
        })
        .then( res => {
          if(res.status !== 200 && res.status !== 201){
            throw new Error('Error fetching products')
          }
  
          return res.json()
        })
        .then(resData => {  
          this.setState({ products: resData.products})
          console.log('products', resData)
        })
        .catch(err => {
          console.log(err)
        })
    }

    requestProductDetails = data => {


        this.props.setProductRequestedData(data)

        this.props.history.push(`/car/${data.productId}`)
    }



    render() {

        const {products} = this.state
        return (
            <div className="inventory">
                <ul className="inventory__list">
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

const mapDispatchToProps = dispatch => {
    return {
        setProductRequestedData: data => dispatch(actions.setProductRequestedData(data))
    }
}


export default connect(null, mapDispatchToProps)(Inventory)