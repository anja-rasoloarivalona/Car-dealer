import React, { Component } from 'react';
import './Sidebar.css';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import Button from '../../../components/button/Button';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';

 class Sidebar extends Component {

    state = {
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

        /*** START INIT MIN AND MAX PRICE ***/
        let min = data[Object.keys(data)[0]].price.min;
        let max = data[Object.keys(data)[0]].price.max;
    
            Object.keys(data).map( brand => {
                if(data[brand].price.min < min){
                    min = data[brand].price.min
                }
    
                if(data[brand].price.max > max){
                    max = data[brand].price.max
                }
            })
        let initPrice = {
                min: min,
                max: max
            }   
        /*** END INIT MIN AND MAX PRICE ***/ 
        

        let parsedQuery = this.props.parsedQuery;             
        if(parsedQuery !== null){
            
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
                priceAllowed: initPrice,
                brandSelected: initBrandSelected,
                brandSelectedWhoseModelSelectorIsRequired:  Object.keys(brandAndModels)

               
            }), () => console.log('from sidebar',this.state.brandSelected))
            

        } else {
      
            this.setState(prevState => ({
                ...prevState,
                searchData: {
                    ...prevState.searchData,
                    price: initPrice,
                },
                brandSelected: ['all'],
                priceAllowed: initPrice
            }), () => console.log('sss', this.state.brandSelected))
        }





        

    }



    selectBrandHandler = brand => {   

        if(brand === 'all'){

            this.setState(prevState => ({
                ...prevState,
                brandSelected: ['all'],
                searchData: {
                    ...prevState.searchData,
                    brandAndModels: {}
                }
            }))

        } else {
            if(this.state.brandSelected.includes('all')){
                this.setState(prevState => ({
                    ...prevState,
                    brandSelected: [brand],
                    searchData: {
                        ...prevState.searchData,
                        brandAndModels: {
                            [brand]: 'all'
                        }
                    }
                }))
    
            } else {
                if(this.state.brandSelected.filter(i => i === brand).length === 0){
                    //If the brand is not selected yet, we add it
                    this.setState(prevState => ({
                        ...prevState,
                        brandSelected: [...prevState.brandSelected, brand],
                        searchData: {...prevState.searchData, 
                                     brandAndModels: {
                                         ...prevState.searchData.brandAndModels,
                                         [brand] : 'all'
                                        }           
                                    }
                                }))
                } else {
                    //The brand is already selected, so we need to remove it
                    let brandSelected = this.state.brandSelected.filter( i => i !== brand);
                    delete this.state.searchData.brandAndModels[brand]
                    this.setState({ brandSelected})
                }
            }
        }

        


        


    }

    selectModelHandler = (brand, model) => {
        //By default, all the models are selected when selecting a brand
        let data = this.state.searchData.brandAndModels

        if(data[brand] === 'all'){
            //Instead of having "all" models, we store the selected model only in the array
            data[brand] = [model]
        } else {
            if(!data[brand].includes(model)){
            //There is already one model selected at least for the current brand, and it's not the current selected model,  so we add it                               
                if(Object.keys(this.props.brandAndModelsData[brand].datas).length === ( Object.keys(data[brand]).length + 1 )  ) {
                    data[brand] = 'all'
                } else {
                    data[brand] = [...data[brand], model]
                }                                     

            }  else {
            //The current model selected is already in the array, so we need to remove it
            data[brand] = data[brand].filter(i => i !== model);
                if(data[brand].length === 0){
                //After removing the model, we check if it was the last one. If that's the case, we also remove the brand from the selected brand array and searchData Object
                let brandSelected = this.state.brandSelected.filter( i => i !== brand);
                delete this.state.searchData.brandAndModels[brand]  
                this.setState({ brandSelected})
                }
            }           
        }
        //In the end, we store our result in the searchData

        this.setState(prevState => ({
            ...prevState,
            searchData: {
                ...prevState.searchData,
                brandAndModels: data
            }
        }))

    }

    toggleBrandSelector = e => {
        e.preventDefault();


        if(!this.state.brandSelected.includes('all')){
            this.setState(prevState => ({
                showBrandSelector:!prevState.showBrandSelector,
                brandSelectedWhoseModelSelectorIsRequired: prevState.brandSelected
            }))
        } else {
            this.setState(prevState => ({
                showBrandSelector:!prevState.showBrandSelector,
            }))
        }

        
    }

    toggleModelSelector = brand => {
        let requiredModelSelector = this.state.brandSelectedWhoseModelSelectorIsRequired;
        if(requiredModelSelector.includes(brand)){
            //The selector is already displayed, so we remove it
            let data = requiredModelSelector.filter(i => i !== brand)
            this.setState({ brandSelectedWhoseModelSelectorIsRequired: data})
        } else {
            //We display the selector by adding it
            this.setState(prevState => ({
                ...prevState,
                brandSelectedWhoseModelSelectorIsRequired: [...prevState.brandSelectedWhoseModelSelectorIsRequired, brand]
            }))
        }
    }

    changePriceHandler = value => {
        this.setState(prevState => ({
            ...prevState,
            searchData: {
                ...prevState.searchData,
                price: value
            }
        }))
    }

    changeYearHandler = value => {
        this.setState(prevState => ({
            ...prevState,
            searchData: {
                ...prevState.searchData,
                year: value
            }
        }))
    }

    searchHandler = e => {
        e.preventDefault()
        this.props.search(this.state.searchData)
    }

    render() {
        const {brandSelected, searchData, brandSelectedWhoseModelSelectorIsRequired, showBrandSelector} = this.state 
        
        let brandAndModelsData = this.props.brandAndModelsData
        let brandKeys; 
        if(brandAndModelsData){
            brandKeys = Object.keys(brandAndModelsData)
        }

        let modelsData= {};
        if(brandSelectedWhoseModelSelectorIsRequired.length > 0){
            brandSelectedWhoseModelSelectorIsRequired.forEach(brand => {
                modelsData = {
                    ...modelsData,
                    [brand]: Object.keys(brandAndModelsData[brand].datas)
                }
            })
        }

        
        let brandCounter

        if(brandSelected === 0 || brandSelected.includes('all')){
            brandCounter = 'Toutes'
        } else {
            brandCounter = brandSelected.length
        }
        


        return (

          
            <div className="inventory__sidebar">

                 {
                     /*
                        <div className="inventory__sidebar__title">
                            Filtres
                        </div>
                     */
                 }   
                        
                    <form className="inventory__sidebar__form">

                        <div className="inventory__sidebar__form__control inventory__sidebar__form__control--made">
                            <div className="inventory__sidebar__form__control__data"
                                 onClick={e => this.toggleBrandSelector(e)}>
                                    <div className="inventory__sidebar__form__control__data__key">
                                        Marques
                                    </div>
                                    <div className="inventory__sidebar__form__control__data__value">
                                        {
                                            brandCounter
                                        }
                                    </div>
                            </div>
                                
                            <div className={`inventory__sidebar__selector
                                            ${this.state.showBrandSelector ? 'active': ''}`}>
                                    <ul className="inventory__sidebar__selector__list">

                                        <li className={`inventory__sidebar__selector__list__option
                                                        ${this.state.brandSelected.includes('all')? 'active': ''}`}
                                            onClick={() => this.selectBrandHandler('all')}>
                                            Toutes
                                        </li>

                                        {
                                        brandKeys.map( brand => (
                                                <li key={brand}
                                                    onClick={() => this.selectBrandHandler(brand)}
                                                    className={`inventory__sidebar__selector__list__option
                                                                ${this.state.brandSelected.includes(brand) ? 'active': ''}`}>
                                                    {brand}
                                                </li>
                                            ))
                                        }
                                    </ul>

                                    <div className="inventory__sidebar__selector__cta">
                                        <Button color="grey"
                                                onClick={e => this.toggleBrandSelector(e)}>
                                            { this.state.brandSelected.includes('all') ? 'OK' : 'Voir models'}
                                        </Button>
                                    </div>
                                    
                            </div>

                                <ul className={`inventory__sidebar__brandSelected
                                                ${showBrandSelector ? 'hide' : ''}`}>
                                        {
                                            brandSelected.length > 0 && brandSelected.map(brand => {
                                                let counter;

                                                if(brand === 'all'){
                                                    return
                                                } else {
                                                    if(searchData.brandAndModels[brand] === 'all' || searchData.brandAndModels[brand].length === Object.keys(brandAndModelsData[brand].datas).length){
                                                        counter = 'Tous'
                                                    } else {
                                                        counter = searchData.brandAndModels[brand].length 
                                                    } 
                                                }
                                              
                                                return (

                                                    <li className="inventory__sidebar__brandSelected__item">
                                                        <div className="inventory__sidebar__brandSelected__item__text"
                                                             onClick={() => this.toggleModelSelector(brand)}>
                                                            <span>
                                                                {brand}
                                                            </span> 
                                                            <span>
                                                                {counter}
                                                            </span>
                                                        </div>            
                                                        <ul className="inventory__sidebar__brandSelected__item__modelSelector">
                                                            {
                                                                modelsData && brandSelectedWhoseModelSelectorIsRequired.includes(brand) && modelsData[brand].map(model => (
                                                                    <li key={model}
                                                                        className={`inventory__sidebar__brandSelected__item__modelSelector__listItem
                                                                                   ${searchData.brandAndModels[brand].includes(model) ? 'active' : ''}`}
                                                                        onClick={() => this.selectModelHandler(brand, model)}>
                                                                        {model}
                                                                    </li>
                                                                ))
                                                            }                                                      
                                                        </ul>
                                                    </li>
                                                  )
                                                }                                              
                                            )
                                        }
                                </ul>
                            </div>    

                        <div className="inventory__sidebar__form__control">

                            <div className="inventory__sidebar__form__control__data inventory__sidebar__form__control__data--price">
                                    <div className="inventory__sidebar__form__control__data__key">
                                        Prix : 
                                    </div>
                                    <div className="inventory__sidebar__form__control__data__value">
                                        <span>{searchData.price.min}</span> - 
                                        <span>{searchData.price.max}</span>
                                    </div>
                            </div>

                            <InputRange 
                                maxValue={this.state.priceAllowed.max}
                                minValue={this.state.priceAllowed.min}
                                value={this.state.searchData.price}
                                onChange={value => this.changePriceHandler(value)}/>
                        </div>

                        <div className="inventory__sidebar__form__control">

                            <div className="inventory__sidebar__form__control__data inventory__sidebar__form__control__data--year">
                                    <div className="inventory__sidebar__form__control__data__key">
                                        Année : 
                                    </div>
                                    <div className="inventory__sidebar__form__control__data__value">
                                        <span>{searchData.year.min}</span> - 
                                        <span>{searchData.year.max}</span>
                                    </div>
                            </div>

                            <InputRange 
                                maxValue={this.state.yearAllowed.max}
                                minValue={this.state.yearAllowed.min}
                                value={this.state.searchData.year}
                                onChange={value => this.changeYearHandler(value)}/>
                        </div>

                        <div className="inventory__sidebar__form__cta">
                            <Button color="primary"
                                    onClick={e => this.searchHandler(e)}>
                                Recherche
                            </Button> 
                        </div>
                                                 
                        </form>
            
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
