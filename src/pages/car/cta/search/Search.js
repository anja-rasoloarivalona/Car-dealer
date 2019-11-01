import React, { Component, Fragment } from 'react';
import './Search.css';
import {connect} from 'react-redux';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';
import Button from '../../../../components/button/Button';

class Search extends Component {

    state = {
        made: 'Toyota',
        model: 'Tous',

        models: this.props.madeAndModelsData.Toyota.datas,

        price: {
            min: this.props.madeAndModelsData.Toyota.price.min,
            max: this.props.madeAndModelsData.Toyota.price.max
        },

        priceAllowed: {
            min: this.props.madeAndModelsData.Toyota.price.min,
            max: this.props.madeAndModelsData.Toyota.price.max,
        },


        showMadeSelector: false,
        showModelSelector: false
    }


    componentWillMount(){
        document.addEventListener('mousedown', this.handleClick, false)
    }

    componentWillUnmount(){
        document.removeEventListener('mousedown', this.handleClick, false)
    }

    handleClick = e => {         
        if(this.madeSelectorOuter && this.madeSelectorOuter.contains(e.target)){
            return
        }

        if(this.modelSelectorOuter && this.modelSelectorOuter.contains(e.target)){
            return
        }

        this.handleClickOutside()
    }

    handleClickOutside = () => {
        this.setState({ showMadeSelector: false, showModelSelector: false})
    }

    toggleSelector = selector => {
        if(selector === 'made'){

            this.setState( prevState => ({
                showMadeSelector: !prevState.showMadeSelector,
                showModelSelector: false,          
            }))
        }

        if(selector === 'model'){
            this.setState( prevState => ({
                showModelSelector: !prevState.showModelSelector,
                showMadeSelector: false,
                
            }))
        }
    }


    changePriceHandler = value => {
        this.setState({ price: value})
    }

    selectMadeHandler = made => {

        let min = this.props.madeAndModelsData[made].price.min;
        let max = this.props.madeAndModelsData[made].price.max;

        let newPriceData = {
            min: min,
            max:max,
        }

        this.setState({ 
                made: made, 
                model:  'Tous',
                showMadeSelector: false,  
                models: this.props.madeAndModelsData[made].datas,
                priceAllowed: newPriceData,
                price: newPriceData
            })
                
    }

    selectModelHandler = model => {

        let newPriceData;

        if(model === 'Tous'){

            let requestedMade = this.state.made;
            let requestedMadePrices = this.props.madeAndModelsData[requestedMade].price;

            newPriceData = {
                min: requestedMadePrices.min,
                max: requestedMadePrices.max
            }

        } else {
            let requestedModel = this.props.madeAndModelsData[this.state.made].datas[model];

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

        let data = this.props.madeAndModelsData

        let madeKeys = Object.keys(data);

        let modelKeys = Object.keys(this.state.models)
     

        return (
            <section className="car__cta__search">

                <div className="car__cta__appointment__title">Recherche</div>

                <form  className="car__cta__search__form">

                    <div  className="car__cta__search__form__item"
                          ref={outer => this.madeSelectorOuter = outer}>

                        <div className="car__cta__search__form__item__key">Made</div>

                        <div className="car__cta__search__form__item__value"
                            onClick={() => this.toggleSelector('made')}>
                                {this.state.made}
                        </div>

                        <ul className={`car__cta__search__form__selector
                                     ${this.state.showMadeSelector ? 'active' : ''}`}>
                            
                            

                            {
                                madeKeys.map(i => (
                                    <li key={i} className="car__cta__search__form__selector__option"
                                        onClick={() => this.selectMadeHandler(i)}>
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
        madeAndModelsData: state.product.madeAndModelsData
    }
}


export default connect(mapStateToProps)(Search)
