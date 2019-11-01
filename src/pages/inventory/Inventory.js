import React, { Component } from 'react'
import './Inventory.css';
import ProductCard from '../../components/ProductCard/ProductCard';
import {connect} from 'react-redux'
import * as actions from '../../store/actions';
import Loader from '../../components/loader/Loader';
import Sidebar from './sidebar/Sidebar';
import queryString from 'query-string';





class Inventory extends Component {

    state = {
        products: null,
        loading: true,

        parsedQuery: null
    }

    componentDidMount(){     
        let parsedQuery = queryString.parse(this.props.location.search);

        if(Object.keys(parsedQuery).length !== 0){
            this.setState({ parsedQuery}, () => console.log('parss',this.state.parsedQuery))
        }
        


        this.fetchProductsHandler(parsedQuery);
    }

    fetchProductsHandler = (query) => {
        let url =  new URL('http://localhost:8000/product');

        let params = {
            made: query.made,
            price: query.price,
            year: query.year
        }
        url.search = new URLSearchParams(params).toString()
  
        fetch( url, {
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
          this.setState({ products: resData.products, loading: false})
        })
        .catch(err => {
          console.log(err)
        })
    }

    requestProductDetails = data => {
        this.props.setProductRequestedData(data)
        this.props.history.push(`/car/${data.productId}`)
    }

    searchHandler = (data) => {

        let madeQuery = 'all';
        let priceQuery = `${data.price.min}:${data.price.max}`
        let yearQuery = `${data.year.min}:${data.year.max}`

        let madeAndModels = data.madeAndModels;
        let madeAndModelsKey = Object.keys(madeAndModels)

        if(madeAndModelsKey.length !== 0){
            madeQuery = '';
            madeAndModelsKey.forEach(made => {
                let query = `${made}:${madeAndModels[made]}`
                madeQuery = madeQuery  + query + '_'
            })
        }
        this.props.history.push({
            pathname: './inventaire',
            search: `?made=${madeQuery}&price=${priceQuery}&year=${yearQuery}`
        })

        let query = {
            made: madeQuery,
            price: priceQuery,
            year: yearQuery
        }

        this.fetchProductsHandler(query)     
       
    }







    render() {

        const {products, loading} = this.state;

        

        let inventory = <Loader />

        if(!loading){
            inventory = (
                <div className="inventory">

                    <Sidebar search={e => this.searchHandler(e)}
                            parsedQuery={this.state.parsedQuery}/>

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

        return inventory
    }
}

const mapStateToProps = state => {
    return {
        madeAndModelsData: state.product.madeAndModelsData
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setProductRequestedData: data => dispatch(actions.setProductRequestedData(data))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Inventory)