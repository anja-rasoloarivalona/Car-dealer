import React, { Component } from 'react'
import './HomeSearch.css'
import { connect } from 'react-redux'
import Controller from '../../../pages/inventory/Controller/Controller';
import Button from '../../../components/button/Button';
import {withRouter} from 'react-router-dom'

class HomeSearch extends Component {

    state = {
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
        }))
    }

    selectBrandHandler = brand => {
        this.setState(prevState => ({
            ...prevState,
            query: {
                ...prevState.query,
                brand: brand
            }
        }))
    }

    selectModelHandler = model => {
        this.setState(prevState => ({
            ...prevState,
            query: {
                ...prevState.query,
                model: model
            }
        }))
    }

    changePriceHandler = value => {
        this.setState(prevState => ({
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

    onChangeComplete = () => {
        this.searchHandler()
    }

   searchHandler = () => {
    const { query } = this.state;
    this.props.history.push({
        pathname: '/inventaire',
        search: `sort=${query.sort}&brand=${query.brand}&model=${query.model}&minPrice=${query.price.value.min}&maxPrice=${query.price.value.max}&minYear=${query.year.value.min}&maxYear=${query.year.value.max}`
    })
   }
    render() {
        const {query} = this.state

        return (
            <div className="home-search">
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

                <div className="home-search__cta">
                    <Button color="primary"
                            onClick={this.searchHandler}
                    >
                        Search
                    </Button>
                </div>

              
         </div>
        )
    }
}



const mapStateToProps = state => {
    return {
        brandAndModelsData: state.product.brandAndModelsData
    }
}
export default connect(mapStateToProps)(withRouter(HomeSearch)) ;