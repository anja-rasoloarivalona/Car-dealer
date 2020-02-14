import React, { Component } from 'react';
import './Controller.css';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import Button from '../../../components/button/Button';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';
import DropDownList from '../../../components/DropDownList/DropDownList'

 class Sidebar extends Component {

    state = {


        query: {
            brand: 'all brands',
            model: 'all models',
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





        brandSelected: [],
        showBrandSelector: true,
        brandSelectedWhoseModelSelectorIsRequired: [],

        searchData: {
            price: {
                min: 0,
                max: 10
            }, 
            year: {
                min: 2008,
                max: 2019
            },

            brandAndModels: {}
        }, //contains the final output
        
        priceAllowed: {},

        yearAllowed: {
            min: 2008,
            max: 2019
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

        let parsedQuery = this.props.parsedQuery;         
        console.log('parsed', parsedQuery);
        if(parsedQuery !== null){
            console.log('parsed not null')
            let brands = parsedQuery.brand.split('_');
            let brandAndModels = {};
            brands.forEach(brand => { 
                let brandName = brand.split(':')[0]                
                if(brand.split(':')[1] !== undefined){
                    let models =  brand.split(':')[1] 
                    let modelsData = models.split(',')        
                    let currentModelsDataSearch;
    
                    if(modelsData[0] === 'all'){
                        currentModelsDataSearch = 'all'
                    } else {
                        
                        currentModelsDataSearch = modelsData
                    }
                    if(brandName !== ''){
                        brandAndModels = {
                            ...brandAndModels,
                            [brandName] : currentModelsDataSearch
                        }
                    }   
                }

            })

            let minYear = parsedQuery.year.split(':')[0];
            let maxYear = parsedQuery.year.split(':')[1];

            let searchDataYear = {
                min: minYear,
                max: maxYear
            }

            let minPrice = parsedQuery.price.split(':')[0];
            let maxPrice = parsedQuery.price.split(':')[1];

            let searchDataPrice = {
                min: minPrice,
                max: maxPrice
            }

            let initBrandSelected;
            if(Object.keys(brandAndModels).length === 0){
                initBrandSelected = ['all']
            } else {
                initBrandSelected = Object.keys(brandAndModels)
            }

            this.setState(prevState => ({
                ...prevState,
                searchData: {
                    ...prevState.searchData,
                    price: searchDataPrice, 
                    year: searchDataYear,
                    brandAndModels: brandAndModels
                },
                // priceAllowed: initPrice,
                brandSelected: initBrandSelected,
                brandSelectedWhoseModelSelectorIsRequired:  Object.keys(brandAndModels)

               
            }), () => console.log('from sidebar',this.state.brandSelected))
            

        } else {
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
            }), () => console.log(this.state))
        }

    }


    selectBrandHandler = brand => {   
        let query = {
            ...this.state.query,
                brand: brand
            }

        if(brand === 'all brands'){
            query = {
                ...query,
                model: 'all models'
            }
        } 
        this.setState({ query })
        }

    selectModelHandler = model => {
        this.setState( prevState => ({
            ...prevState,
            query: {
                ...prevState.query,
                model: model
            }
        }))
    }

    sortHandler = sort => {
        this.setState(prevState => ({
            ...prevState,
            query : {
                ...prevState.query,
                sort: sort
            }         
        }))
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

    searchHandler = e => {
        e.preventDefault()
        this.props.search(this.state.searchData)
    }

    render() {
        const {query} = this.state     
        let data = this.props.brandAndModelsData;

        return (
       
            <div className="inventory__controller">
                   
                        <DropDownList 
                            value={query.brand}
                            list={['all brands',...Object.keys(data)]}
                            selectItemHandler={this.selectBrandHandler}
                        />
                  
  
                        <DropDownList 
                            value={query.model}
                            list={ query.brand !== 'all brands' ? ["all models",...Object.keys(data[query.brand].datas)] : ['all models']}
                            selectItemHandler={this.selectModelHandler}
                        />
              
     
                        <DropDownList 
                            value={query.sort}
                            list={['increasing price', 'decreasing price', 'latest', 'most popular']}
                            selectItemHandler={this.sortHandler}
                        />
                 

                    <div className="inventory__controller__group">
                        <div className="inventory__controller__group__infos">
                            <div className="inventory__controller__group__infos__key">
                                Price
                            </div>
                            <div className="inventory__controller__group__infos__value">
                                {query.price.value.min} - {query.price.value.max}
                            </div>
                        </div>
                        <InputRange 
                            maxValue={query.price.scope.max}
                            minValue={query.price.scope.min}
                            value={query.price.value}
                            onChange={value => this.changePriceHandler(value)}/>
                    </div>

                    <div className="inventory__controller__group">
                        <div className="inventory__controller__group__infos">
                            <div className="inventory__controller__group__infos__key">
                                Year
                            </div>
                            <div className="inventory__controller__group__infos__value">
                                {query.year.value.min} - {query.year.value.max}
                            </div>
                        </div>
                        <InputRange 
                            maxValue={query.year.scope.max}
                            minValue={query.year.scope.min}
                            value={query.year.value}
                            onChange={value => this.changeYearHandler(value)}/>
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

export default connect(mapStateToProps)(Sidebar)
