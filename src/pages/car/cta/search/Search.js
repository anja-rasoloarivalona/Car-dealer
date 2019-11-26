import React, { Component, Fragment } from 'react';
import './Search.css';
import {connect} from 'react-redux';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';
import Button from '../../../../components/button/Button';

class Search extends Component {

    state = {
        brand: 'Toyota',
        model: 'Tous',

        models: this.props.brandAndModelsData.Toyota.datas,

        price: {
            min: this.props.brandAndModelsData.Toyota.price.min,
            max: this.props.brandAndModelsData.Toyota.price.max
        },

        priceAllowed: {
            min: this.props.brandAndModelsData.Toyota.price.min,
            max: this.props.brandAndModelsData.Toyota.price.max,
        },


        showBrandSelector: false,
        showModelSelector: false
    }


    componentWillMount(){
        document.addEventListener('mousedown', this.handleClick, false)
    }

    componentWillUnmount(){
        document.removeEventListener('mousedown', this.handleClick, false)
    }

    handleClick = e => {         
        if(this.brandSelectorOuter && this.brandSelectorOuter.contains(e.target)){
            return
        }

        if(this.modelSelectorOuter && this.modelSelectorOuter.contains(e.target)){
            return
        }

        this.handleClickOutside()
    }

    handleClickOutside = () => {
        this.setState({ showBrandSelector: false, showModelSelector: false})
    }

    toggleSelector = selector => {
        if(selector === 'brand'){

            console.log('toggle brnad', selector)
            this.setState( prevState => ({
                showBrandSelector: !prevState.showBrandSelector,
                showModelSelector: false,          
            }))
        }

        if(selector === 'model'){
            this.setState( prevState => ({
                showModelSelector: !prevState.showModelSelector,
                showMBrandSelector: false,
                
            }))
        }
    }


    changePriceHandler = value => {
        this.setState({ price: value})
    }

    selectBrandHandler = brand => {

        let min = this.props.brandAndModelsData[brand].price.min;
        let max = this.props.brandAndModelsData[brand].price.max;

        let newPriceData = {
            min: min,
            max:max,
        }

        this.setState({ 
                brand: brand, 
                model:  'Tous',
                showBrandSelector: false,  
                models: this.props.brandAndModelsData[brand].datas,
                priceAllowed: newPriceData,
                price: newPriceData
            })
                
    }

    selectModelHandler = model => {

        let newPriceData;

        if(model === 'Tous'){

            let requestedBrand = this.state.brand;
            let requestedBrandPrices = this.props.brandAndModelsData[requestedBrand].price;

            newPriceData = {
                min: requestedBrandPrices.min,
                max: requestedBrandPrices.max
            }

        } else {
            let requestedModel = this.props.brandAndModelsData[this.state.brand].datas[model];

            newPriceData = {
                min: requestedModel.min,
                max:requestedModel.max,
            }
        }

        

        this.setState({
            model: model,
            showModelSelector: false,
            priceAllowed: newPriceData,
            price: newPriceData
        })
    }




    
    render() {

        let data = this.props.brandAndModelsData

        let brandKeys = Object.keys(data);

        let modelKeys = Object.keys(this.state.models)
     

        return (
            <section className="car__cta__search">

                <div className="car__cta__appointment__title">Recherche</div>

                <form  className="car__cta__search__form">

                    <div  className="car__cta__search__form__item"
                          ref={outer => this.brandSelectorOuter = outer}>

                        <div className="car__cta__search__form__item__key">Brand</div>

                        <div className="car__cta__search__form__item__value"
                            onClick={() => this.toggleSelector('brand')}>
                                {this.state.brand}
                        </div>

                        <ul className={`car__cta__search__form__selector
                                     ${this.state.showBrandSelector ? 'active' : ''}`}>
                            
                            

                            {
                                brandKeys.map(i => (
                                    <li key={i} className="car__cta__search__form__selector__option"
                                        onClick={() => this.selectBrandHandler(i)}>
                                        {i}
                                    </li>
                                ))
                            }
                            
                        </ul>
                    </div>



                    <div  className="car__cta__search__form__item"
                        ref={outer => this.modelSelectorOuter = outer}>
                        <div className="car__cta__search__form__item__key">Model</div>
                        <div className="car__cta__search__form__item__value"
                             onClick={() => this.toggleSelector('model')}>{this.state.model}</div>

                        <ul className={`car__cta__search__form__selector
                                     ${this.state.showModelSelector ? 'active' : ''}`}>


                            <li className="car__cta__search__form__selector__option"
                                        onClick={() => this.selectModelHandler('Tous')}>
                                Tous
                            </li>
                            {
                                
                                modelKeys.map(i => (
                                    <li key={i} className="car__cta__search__form__selector__option"
                                        onClick={() => this.selectModelHandler(i)}>
                                        {[i]}
                                    </li>
                                ))
                              
                            }
                        </ul>



                    </div>

                    <div className="car__cta__search__form__item">
                        <div className="car__cta__search__form__item__key">Prix</div>
                        <div className="car__cta__search__form__item__value">

                            {
                                this.state.price.min !== this.state.price.max && (
                                    <Fragment>
                                        <span>{this.state.price.min}</span> - <span>{this.state.price.max} MRU</span>
                                    </Fragment>
                                        
                                )

                            }
                            {
                                this.state.price.min === this.state.price.max && (
                                        <span>{this.state.price.min} MRU</span>  
                                )

                            }
                            
                        </div>
                    </div>

                    <InputRange 
                        maxValue={this.state.priceAllowed.max} 
                        minValue={this.state.priceAllowed.min} 
                              
                        value={this.state.price} 
                        onChange={value => this.changePriceHandler(value)}/>

                    <div className="car__cta__search__form__submit">
                        <Button color="grey">
                            Recherche
                        </Button>
                    </div>
                </form>
            </section>
        )
    }
}


const mapStateToProps = state => {
    return {
        brandAndModelsData: state.product.brandAndModelsData
    }
}


export default connect(mapStateToProps)(Search)
