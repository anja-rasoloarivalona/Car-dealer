import React, { Component } from 'react';
import './Sidebar.css';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import Button from '../../../components/button/Button';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';

 class Sidebar extends Component {

    state = {
        madeSelected: [],
        showMadeSelector: true,
        madeSelectedWhoseModelSelectorIsRequired: [],

        searchData: {
            price: {
                min: 0,
                max: 10
            }, 
            year: {
                min: 2008,
                max: 2019
            },

            madeAndModels: {}
        }, //contains the final output
        
        priceAllowed: {},

        yearAllowed: {
            min: 2008,
            max: 2019
        }

    }

    componentDidMount(){

        let data = this.props.madeAndModelsData;

        /*** START INIT MIN AND MAX PRICE ***/
        let min = data[Object.keys(data)[0]].price.min;
        let max = data[Object.keys(data)[0]].price.max;
    
            Object.keys(data).map( made => {
                if(data[made].price.min < min){
                    min = data[made].price.min
                }
    
                if(data[made].price.max > max){
                    max = data[made].price.max
                }
            })
        let initPrice = {
                min: min,
                max: max
            }   
        /*** END INIT MIN AND MAX PRICE ***/ 
        

        let parsedQuery = this.props.parsedQuery;             
        if(parsedQuery !== null){
            
            let mades = parsedQuery.made.split('_');
            let madeAndModels = {};

            mades.forEach(made => {
  
                let madeName = made.split(':')[0]                
                if(made.split(':')[1] !== undefined){
                    let models =  made.split(':')[1] 
                    let modelsData = models.split(',')        
                    let currentModelsDataSearch;
    
                    if(modelsData[0] === 'all'){
                        currentModelsDataSearch = 'all'
                    } else {
                        
                        currentModelsDataSearch = modelsData
                    }
                    if(madeName !== ''){
                        madeAndModels = {
                            ...madeAndModels,
                            [madeName] : currentModelsDataSearch
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

            let initMadeSelected;
            if(Object.keys(madeAndModels).length === 0){
                initMadeSelected = ['all']
            } else {
                initMadeSelected = Object.keys(madeAndModels)
            }

            this.setState(prevState => ({
                ...prevState,
                searchData: {
                    ...prevState.searchData,
                    price: searchDataPrice, 
                    year: searchDataYear,
                    madeAndModels: madeAndModels
                },
                priceAllowed: initPrice,
                madeSelected: initMadeSelected,
                madeSelectedWhoseModelSelectorIsRequired:  Object.keys(madeAndModels)

               
            }), () => console.log('from sidebar',this.state.madeSelected))
            

        } else {
      
            this.setState(prevState => ({
                ...prevState,
                searchData: {
                    ...prevState.searchData,
                    price: initPrice,
                },
                madeSelected: ['all'],
                priceAllowed: initPrice
            }), () => console.log('sss', this.state.madeSelected))
        }





        

    }



    selectMadeHandler = made => {   

        if(made === 'all'){

            this.setState(prevState => ({
                ...prevState,
                madeSelected: ['all'],
                searchData: {
                    ...prevState.searchData,
                    madeAndModels: {}
                }
            }))

        } else {
            if(this.state.madeSelected.includes('all')){
                this.setState(prevState => ({
                    ...prevState,
                    madeSelected: [made],
                    searchData: {
                        ...prevState.searchData,
                        madeAndModels: {
                            [made]: 'all'
                        }
                    }
                }))
    
            } else {
                if(this.state.madeSelected.filter(i => i === made).length === 0){
                    //If the made is not selected yet, we add it
                    this.setState(prevState => ({
                        ...prevState,
                        madeSelected: [...prevState.madeSelected, made],
                        searchData: {...prevState.searchData, 
                                     madeAndModels: {
                                         ...prevState.searchData.madeAndModels,
                                         [made] : 'all'
                                        }           
                                    }
                                }))
                } else {
                    //The made is already selected, so we need to remove it
                    let madeSelected = this.state.madeSelected.filter( i => i !== made);
                    delete this.state.searchData.madeAndModels[made]
                    this.setState({ madeSelected})
                }
            }
        }

        


        


    }

    selectModelHandler = (made, model) => {
        //By default, all the models are selected when selecting a made
        let data = this.state.searchData.madeAndModels

        if(data[made] === 'all'){
            //Instead of having "all" models, we store the selected model only in the array
            data[made] = [model]
        } else {
            if(!data[made].includes(model)){
            //There is already one model selected at least for the current made, and it's not the current selected model,  so we add it                               
                if(Object.keys(this.props.madeAndModelsData[made].datas).length === ( Object.keys(data[made]).length + 1 )  ) {
                    data[made] = 'all'
                } else {
                    data[made] = [...data[made], model]
                }                                     

            }  else {
            //The current model selected is already in the array, so we need to remove it
            data[made] = data[made].filter(i => i !== model);
                if(data[made].length === 0){
                //After removing the model, we check if it was the last one. If that's the case, we also remove the made from the selected made array and searchData Object
                let madeSelected = this.state.madeSelected.filter( i => i !== made);
                delete this.state.searchData.madeAndModels[made]  
                this.setState({ madeSelected})
                }
            }           
        }
        //In the end, we store our result in the searchData

        this.setState(prevState => ({
            ...prevState,
            searchData: {
                ...prevState.searchData,
                madeAndModels: data
            }
        }))

    }

    toggleMadeSelector = e => {
        e.preventDefault();


        if(!this.state.madeSelected.includes('all')){
            this.setState(prevState => ({
                showMadeSelector:!prevState.showMadeSelector,
                madeSelectedWhoseModelSelectorIsRequired: prevState.madeSelected
            }))
        } else {
            this.setState(prevState => ({
                showMadeSelector:!prevState.showMadeSelector,
            }))
        }

        
    }

    toggleModelSelector = made => {
        let requiredModelSelector = this.state.madeSelectedWhoseModelSelectorIsRequired;
        if(requiredModelSelector.includes(made)){
            //The selector is already displayed, so we remove it
            let data = requiredModelSelector.filter(i => i !== made)
            this.setState({ madeSelectedWhoseModelSelectorIsRequired: data})
        } else {
            //We display the selector by adding it
            this.setState(prevState => ({
                ...prevState,
                madeSelectedWhoseModelSelectorIsRequired: [...prevState.madeSelectedWhoseModelSelectorIsRequired, made]
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
        const {madeSelected, searchData, madeSelectedWhoseModelSelectorIsRequired, showMadeSelector} = this.state 
        
        let madeAndModelsData = this.props.madeAndModelsData
        let madeKeys; 
        if(madeAndModelsData){
            madeKeys = Object.keys(madeAndModelsData)
        }

        let modelsData= {};
        if(madeSelectedWhoseModelSelectorIsRequired.length > 0){
            madeSelectedWhoseModelSelectorIsRequired.forEach(made => {
                modelsData = {
                    ...modelsData,
                    [made]: Object.keys(madeAndModelsData[made].datas)
                }
            })
        }

        
        let madeCounter

        if(madeSelected === 0 || madeSelected.includes('all')){
            madeCounter = 'Toutes'
        } else {
            madeCounter = madeSelected.length
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
                                 onClick={e => this.toggleMadeSelector(e)}>
                                    <div className="inventory__sidebar__form__control__data__key">
                                        Marques
                                    </div>
                                    <div className="inventory__sidebar__form__control__data__value">
                                        {
                                            madeCounter
                                        }
                                    </div>
                            </div>
                                
                            <div className={`inventory__sidebar__selector
                                            ${this.state.showMadeSelector ? 'active': ''}`}>
                                    <ul className="inventory__sidebar__selector__list">

                                        <li className={`inventory__sidebar__selector__list__option
                                                        ${this.state.madeSelected.includes('all')? 'active': ''}`}
                                            onClick={() => this.selectMadeHandler('all')}>
                                            Toutes
                                        </li>

                                        {
                                        madeKeys.map( made => (
                                                <li key={made}
                                                    onClick={() => this.selectMadeHandler(made)}
                                                    className={`inventory__sidebar__selector__list__option
                                                                ${this.state.madeSelected.includes(made) ? 'active': ''}`}>
                                                    {made}
                                                </li>
                                            ))
                                        }
                                    </ul>

                                    <div className="inventory__sidebar__selector__cta">
                                        <Button color="grey"
                                                onClick={e => this.toggleMadeSelector(e)}>
                                            { this.state.madeSelected.includes('all') ? 'OK' : 'Voir models'}
                                        </Button>
                                    </div>
                                    
                            </div>

                                <ul className={`inventory__sidebar__madeSelected
                                                ${showMadeSelector ? 'hide' : ''}`}>
                                        {
                                            madeSelected.length > 0 && madeSelected.map(made => {
                                                let counter;

                                                if(made === 'all'){
                                                    return
                                                } else {
                                                    if(searchData.madeAndModels[made] === 'all' || searchData.madeAndModels[made].length === Object.keys(madeAndModelsData[made].datas).length){
                                                        counter = 'Tous'
                                                    } else {
                                                        counter = searchData.madeAndModels[made].length 
                                                    } 
                                                }
                                              
                                                return (

                                                    <li className="inventory__sidebar__madeSelected__item">
                                                        <div className="inventory__sidebar__madeSelected__item__text"
                                                             onClick={() => this.toggleModelSelector(made)}>
                                                            <span>
                                                                {made}
                                                            </span> 
                                                            <span>
                                                                {counter}
                                                            </span>
                                                        </div>            
                                                        <ul className="inventory__sidebar__madeSelected__item__modelSelector">
                                                            {
                                                                modelsData && madeSelectedWhoseModelSelectorIsRequired.includes(made) && modelsData[made].map(model => (
                                                                    <li key={model}
                                                                        className={`inventory__sidebar__madeSelected__item__modelSelector__listItem
                                                                                   ${searchData.madeAndModels[made].includes(model) ? 'active' : ''}`}
                                                                        onClick={() => this.selectModelHandler(made, model)}>
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
        madeAndModelsData: state.product.madeAndModelsData
    }
}

export default connect(mapStateToProps)(Sidebar)
