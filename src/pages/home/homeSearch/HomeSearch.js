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
            bodyType: 'all',
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
        /*** START INIT MIN AND MAX PRICE ***/
        let minPrice = this.props.price.min
        let maxPrice = this.props.price.max
    
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

    selectBodyTypeHandler = bodyType => {
        this.setState(prevState => ({
            ...prevState,
            query: {
                ...prevState.query,
                bodyType: bodyType
            }
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
        pathname: '/inventory',
        search: `sort=${query.sort}&bodyType=${query.bodyType}&brand=${query.brand}&model=${query.model}&minPrice=${query.price.value.min}&maxPrice=${query.price.value.max}&minYear=${query.year.value.min}&maxYear=${query.year.value.max}`
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
                        selectBodyTypeHandler={this.selectBodyTypeHandler}
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
        brandAndModelsData: state.product.brandAndModelsData,
        price: state.product.price
    }
}
export default connect(mapStateToProps)(withRouter(HomeSearch)) ;