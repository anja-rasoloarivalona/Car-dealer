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

        parsedQuery: null,
        sort: 'prix croissant'
    }

    componentDidMount(){     
        let parsedQuery = queryString.parse(this.props.location.search);

        if(Object.keys(parsedQuery).length !== 0){
            this.setState({ parsedQuery}, () => console.log('parss',this.state.parsedQuery))
        }     
        this.fetchProductsHandler(parsedQuery);
    }

    fetchProductsHandler = (query, sort) => {
        let url =  new URL('http://localhost:8000/product');

        let params = {
            sortBy: sort
        }

        if(query){
            params = {
                ...params,
                brand: query.brand,
                price: query.price,
                year: query.year,
            }
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

        let brandQuery = 'all';
        let priceQuery = `${data.price.min}:${data.price.max}`
        let yearQuery = `${data.year.min}:${data.year.max}`

        let brandAndModels = data.brandAndModels;
        let brandAndModelsKey = Object.keys(brandAndModels)

        if(brandAndModelsKey.length !== 0){
            brandQuery = '';
            brandAndModelsKey.forEach(brand => {
                let query = `${brand}:${brandAndModels[brand]}`
                brandQuery = brandQuery  + query + '_'
            })
        }
        this.props.history.push({
            pathname: './inventaire',
            search: `?brand=${brandQuery}&price=${priceQuery}&year=${yearQuery}`
        })

        let query = {
            brand: brandQuery,
            price: priceQuery,
            year: yearQuery
        }

        this.fetchProductsHandler(query)     
       
    }

    selectSortHandler = sort => {
        this.setState( { sort })
        this.fetchProductsHandler(this.state.parsedQuery, sort)
    }







    render() {

        const {products, loading} = this.state;

        

        let inventory = <Loader />

        if(!loading){
            inventory = (
                <div className="inventory">

                    <Sidebar search={e => this.searchHandler(e)}
                            parsedQuery={this.state.parsedQuery}/>

                    <section className="inventory__container">

                        <div className="inventory__controller">

                            <div className="inventory__controller__sort">
                                <div className="inventory__controller__sort__key">Trier par</div>

                                <select className="inventory__controller__sort__selector"
                                        onChange={e => this.selectSortHandler(e.target.value)}>
                                    <option value="prix croissant">prix croissant</option>
                                    <option value="prix décroissant">prix décroissant</option>
                                    <option value="popularité">popularité</option>
                                    <option value="date">date</option>
                                </select>
                            </div>
                        </div>
                        <ul className="inventory__list">
                            {
                                products && products.map(product => (
                                        <ProductCard 
                                                key= {product._id}
                                                _id = {product._id}
                                                mainImgUrl={product.general.mainImgUrl}
                                                brand={product.general.brand}
                                                model={product.general.model}
                                                year={product.general.year}
                                                price={product.general.price}
                                                nbKilometers={product.general.nbKilometers}
                                                gazol={product.general.gazol}
                                                transmissionType={product.general.transmissionType}
                                                requestProductDetails={this.requestProductDetails.bind(this)}
                                            />
                                                )
                                )
                            }
                        </ul>
                    </section>
                    
                </div>
            )
        }

        return inventory
    }
}

const mapStateToProps = state => {
    return {
        brandAndModelsData: state.product.brandAndModelsData
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setProductRequestedData: data => dispatch(actions.setProductRequestedData(data))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Inventory)