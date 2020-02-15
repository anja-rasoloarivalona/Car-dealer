import React, { Component } from 'react'
import './Inventory.css';
import ProductCard from '../../components/ProductCard/ProductCard';
import {connect} from 'react-redux'
import * as actions from '../../store/actions';
import Loader from '../../components/loader/Loader';
import Controller from './Controller/Controller';
import queryString from 'query-string';





class Inventory extends Component {

    state = {
        products: null,
        loading: true,
        query: {
            brand: 'all',
            model: 'all',
            year: {
                value: {
                    min: 2008,
                    max: 2020
                },
                scope: {
                    min: 2008,
                    max: 2020
                }
            },
            price: {
                value: {
                    min: null,
                    max: null
                },
                scope: {
                    min: null,
                    max: null
                }
            },
            sort: 'increasing price'

        }
    }

    componentDidMount(){     
        let data = this.props.brandAndModelsData;
        console.log('dataa', data)

        /*** START INIT MIN AND MAX PRICE ***/
        let minPrice = data[Object.keys(data)[0]].price.min;
        let maxPrice = data[Object.keys(data)[0]].price.max;
    
            Object.keys(data).map( brand => {
                if(data[brand].price.min < minPrice){
                    minPrice = data[brand].price.min
                }
    
                if(data[brand].price.max > maxPrice){
                    maxPrice = data[brand].price.max
                }
        })  
        /*** END INIT MIN AND MAX PRICE ***/  
        
        
        let parsedQuery = queryString.parse(this.props.location.search);

        if(Object.keys(parsedQuery).length !== 0){
            console.log('parsed', parsedQuery)
            this.setState(prevState => ({
            ...prevState,
            query: {
                ...prevState.query,
                price : {
                    scope: {
                        min: minPrice,
                        max: maxPrice
                    },  
                    value: {
                        min: parseInt(parsedQuery.minPrice),
                        max: parseInt(parsedQuery.maxPrice)
                    }
                },
                year : {
                    ...prevState.query.year,
                    value: {
                        min: parseInt(parsedQuery.minYear),
                        max: parseInt(parsedQuery.maxYear)
                    }
                },
                brand: parsedQuery.brand,
                model: parsedQuery.model,
                sort: parsedQuery.sort                  
            },
        }), () =>  this.fetchProductsHandler())
        }  else {
            this.setState(prevState => ({
                ...prevState,
                query: {
                    ...prevState.query,
                    price : {
                        value: {
                            min: minPrice,
                            max: maxPrice
                        },
                        scope: {
                            min: minPrice,
                            max: maxPrice
                        }   
                    }                 
                },
            }), () =>  this.fetchProductsHandler())
        }
    }

    fetchProductsHandler = () => {
        const {query} = this.state
        let url =  new URL('http://localhost:8000/product/client');
        let params;
        if(query){
            params = {
                ...params,
                brand: query.brand,
                model: query.model,
                minPrice: query.price.value.min,
                maxPrice: query.price.value.max,
                minYear: query.year.value.min,
                minYear: query.year.value.min,
                sort: query.sort.split(' ').length > 0 ? `${query.sort.split(' ')[0]}_${query.sort.split(' ')[1]}` : query.sort
            }
            url.search = new URLSearchParams(params).toString()
        }
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
          this.setState({ products: resData.products, loading: false});
          this.props.history.push({
              pathname: '/inventaire',
              search: `sort=${query.sort}&brand=${query.brand}&model=${query.model}&minPrice=${query.price.value.min}&maxPrice=${query.price.value.max}&minYear=${query.year.value.min}&maxYear=${query.year.value.max}`
          })
        })
        .catch(err => {
          console.log(err)
        })
    }

    requestProductDetails = data => {
        this.props.setProductRequestedData(data)
        this.props.history.push(`/car/${data._id}?brand=${data.general.brand}&model=${data.general.model}&price=${data.general.price}`)
    }
    selectBrandHandler = brand => {   
        let query = {
            ...this.state.query,
                brand: brand
            }
        if(brand === 'all'){
            query = {
                ...query,
                model: 'all'
            }
        } 
        this.setState({ query }, () => this.fetchProductsHandler(query))
    }
    selectModelHandler = model => {
        this.setState( prevState => ({
            ...prevState,
            query: {
                ...prevState.query,
                model: model
            }
        }), () => this.fetchProductsHandler())
    }
    sortHandler = sort => {
        this.setState(prevState => ({
            ...prevState,
            query : {
                ...prevState.query,
                sort: sort
            }         
        }), () => this.fetchProductsHandler())
    }
    changePriceHandler = value => {
        this.setState( prevState => ({
            ...prevState,
            query: {
                ...prevState.query,
                price: {
                    ...prevState.query.price,
                    value: value
                }
            }
        }))
    }
    changeYearHandler = value => {
        this.setState(prevState => ({
            ...prevState,
            query: {
                ...prevState.query,
                year: {
                    ...prevState.query.year,
                    value: value
                }
            }
        }))
    }
    changeComplete = () => {
        this.fetchProductsHandler()
    }

    render() {
        const {products, loading, query} = this.state;
        let inventory = <Loader />

        if(!loading){
            inventory = (
                <div className="inventory">

                    <Controller
                        query={query}
                        selectBrandHandler={this.selectBrandHandler}
                        selectModelHandler={this.selectModelHandler}
                        sortHandler={this.sortHandler}
                        changePriceHandler={this.changePriceHandler}
                        changeYearHandler={this.changeYearHandler}
                        changeComplete={this.changeComplete}
                        data={this.props.brandAndModelsData}
                    />

                    <section className="inventory__container">
                        <ul className="inventory__list">
                        {products && products.map(product => (
                            <li className="inventory__list__item"
                                key={product._id}>             
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
                                                requestProductDetails={() => this.requestProductDetails(product)}
                                            />
                            </li>
                            ))}
                            
                            
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