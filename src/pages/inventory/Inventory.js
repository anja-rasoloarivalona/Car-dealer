import React, { Component } from 'react'
import './Inventory.css';
import {connect} from 'react-redux'
import Loader from '../../components/loader/Loader';
import Controller from './Controller/Controller';
import queryString from 'query-string';
import * as actions from '../../store/actions'
import ProductsList from '../../components/ProductsList/ProductsList';
import Paginator from '../../components/Paginator/Paginator'

class Inventory extends Component {

    state = {
        products: null,
        loading: true,
        query: {
            brand: 'all',
            model: 'all',
            bodyType: 'all',
            page: 1,
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

        },
        lastPage: null
    }

    componentDidMount(){     
        /*** START INIT MIN AND MAX PRICE ***/
        let minPrice = this.props.price.min;
        let maxPrice = this.props.price.max
        /*** END INIT MIN AND MAX PRICE ***/  
               
        let parsedQuery = queryString.parse(this.props.location.search);
        if(Object.keys(parsedQuery).length !== 0){
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
                sort: parsedQuery.sort,
                bodyType: parsedQuery.bodyType,
                page: parsedQuery.page                  
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
                lastPage: Math.ceil(this.props.totalProductsCounter / this.props.itemsPerPage)
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
                page: query.page,
                brand: query.brand,
                bodyType: query.bodyType,
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
              pathname: '/inventory',
              search: `sort=${query.sort}&page=${query.page}&bodyType=${query.bodyType}&brand=${query.brand}&model=${query.model}&minPrice=${query.price.value.min}&maxPrice=${query.price.value.max}&minYear=${query.year.value.min}&maxYear=${query.year.value.max}`
          })
        })
        .catch(err => {
          console.log(err)
        })
    }

    selectBodyTypeHandler = bodyType => {
        let data = this.props.brandAndModelsData;
        let stateQuery = this.state.query
        let query
        if(stateQuery.brand !== 'all'){   
            if(Object.keys(data[stateQuery.brand]).includes(bodyType)){
                query = {
                    ...this.state.query,
                    bodyType: bodyType
                } 
            } else {
                query = {
                    ...this.state.query,
                    bodyType: bodyType,
                    brand: 'all',
                    model: 'all',
                    page: 1
                } 
            }
        } else {
            query = {
                ...this.state.query,
                bodyType: bodyType
            } 
        }

        this.setState({ query}, () => this.fetchProductsHandler(query))
    }


    selectBrandHandler = brand => {   
        let query = {
            ...this.state.query,
                brand: brand
            }
        if(brand === 'all'){
            query = {
                ...query,
                model: 'all',
                page: 1
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
                sort: sort,
                page: 1
            }         
        }), () => this.fetchProductsHandler())
    }
    changePriceHandler = value => {
        this.setState( prevState => ({
            ...prevState,
            query: {
                ...prevState.query,
                page: 1,
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
                page: 1,
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

    paginationHandler = direction => {

        console.log(direction);

        let query = this.state.query  
        if(direction === 'next' &&  this.props.currentInventoryPage < this.state.lastPage ){ 
            console.log('nexting');


                query = {
                    ...query,
                    page: this.props.currentInventoryPage + 1
                  }
            this.props.setInventoryCurrentPage(this.props.currentInventoryPage + 1)
            this.setState({ query }, () => this.fetchProductsHandler())
        }
        if(direction === 'previous' && this.props.currentInventoryPage > 1 ){
          query = {
            ...query,
            page: this.props.currentInventoryPage - 1
          }
          this.props.setInventoryCurrentPage(this.props.currentInventoryPage - 1)
          this.setState({ query }, () => this.fetchProductsHandler())
        }


        if(direction !== 'previous' && direction !== 'next'){
          query = {
            ...query,
            page: direction
          }
          this.props.setInventoryCurrentPage(direction)
          this.setState({ query }, () => this.fetchProductsHandler())
        }

        
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
                        selectBodyTypeHandler={this.selectBodyTypeHandler}
                        sortHandler={this.sortHandler}
                        changePriceHandler={this.changePriceHandler}
                        changeYearHandler={this.changeYearHandler}
                        changeComplete={this.changeComplete}
                        data={this.props.brandAndModelsData}
                    />
                    <section className="inventory__container">
                        {products && (
                            <Paginator
                            onRequestPreviousPage={this.paginationHandler.bind(this, 'previous')}
                            onRequestNextPage={this.paginationHandler.bind(this, 'next')}
                            lastPage={Math.ceil(this.props.totalProductsCounter / this.props.itemsPerPage)}
                            currentPage={this.props.currentInventoryPage}
                            onRequestPageNumber={this.paginationHandler}
                            products={products}
                            >
                                <ProductsList productsList={products}/>
                            </Paginator>
                                          
                        )}
                    </section>
                    
                </div>
            )
        }

        return inventory
    }
}

const mapStateToProps = state => {
    return {
        brandAndModelsData: state.product.brandAndModelsData,
        price: state.product.price,
        totalProductsCounter: state.product.totalProductsCounter,
        currentInventoryPage: state.product.currentInventoryPage,
        itemsPerPage: state.product.itemsPerPage
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setInventoryCurrentPage: data => dispatch(actions.setInventoryCurrentPage(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Inventory)