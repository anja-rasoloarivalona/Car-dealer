import React, { Component } from 'react';
import './Controller.css';
import { connect } from 'react-redux';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';
import DropDownList from '../../../components/DropDownList/DropDownList'
import {defineMessages, injectIntl, FormattedMessage} from "react-intl"


const messages = defineMessages({
    allBodyTypes: {
        id: "allBodyTypes",
        defaultMessage: "all body types"
    },
    allBrands: {
        id: "allBrands",
        defaultMessage: "all brands"
    },
    allModels: {
        id: "allModels",
        defaultMessage: "all models"
    },
    increasingPrice: {
        id: "increasingPrice",
        defaultMessage: "increasing price"
    },
    decreasingPrice: {
        id: "decreasingPrice",
        defaultMessage: "decreasing price"
    },
    latest: {
        id: "latest",
        defaultMessage: "latest"
    },
    mostPopular: {
        id: "mostPopular",
        defaultMessage: "most popular"
    }
})


 class Controller extends Component {

    componentDidUpdate(prevProps){
        // if(prevProps.currency !== this.props.currency){
        //    console.log('formated', this.props.query.price.formatedValue)
        // }
    }
    render() {
        const {formatMessage } = this.props.intl

        const {query} = this.props;  
        let bodyTypeList = this.props.bodyTypeList;
        let data = this.props.brandAndModelsData;


        let brandData = Object.keys(data)
        let bodyTypeBrandData = [];
        if(query.bodyType !== 'all'){
            Object.keys(data).forEach(brand => {
                if(Object.keys(data[brand]).includes(query.bodyType)){
                    bodyTypeBrandData.push(brand)
                }
            })
            brandData = bodyTypeBrandData
        }

        let modelData = [];
        if(query.brand !== 'all'){
            if(query.bodyType === 'all'){
                Object.keys(data[query.brand]).forEach(bodyType => {
                    modelData = [...modelData, ...data[query.brand][bodyType]]
                })
            } else { modelData = [...modelData, ...data[query.brand][query.bodyType]]
            }
        }


        return (
       
            <div className="inventory__controller">

                        <DropDownList 
                            value={query.bodyType === 'all' ? formatMessage(messages.allBodyTypes) : query.bodyType}
                            list={[ {text: formatMessage(messages.allBodyTypes), value: 'all'}, ...bodyTypeList]}
                            selectItemHandler={this.props.selectBodyTypeHandler}
                        />

                        <DropDownList 
                            value={query.brand === 'all' ? formatMessage(messages.allBrands) : query.brand}
                            list={[ {text: formatMessage(messages.allBrands), value: 'all'}, ...brandData]}
                            selectItemHandler={this.props.selectBrandHandler}
                        />
      
                        <DropDownList 
                            value={query.model === 'all' ? formatMessage(messages.allModels) : query.model}
                            list={ query.brand !== 'all' ? [{text: formatMessage(messages.allModels), value: 'all'}, ...modelData] : [ {text: formatMessage(messages.allModels), value: 'all' }]}
                            selectItemHandler={this.props.selectModelHandler}
                        />
              
                        {query.sort && (
                            <DropDownList 
                            value={query.sort.split(' ').length > 1 ? formatMessage(messages[`${query.sort.split(' ')[0]}${query.sort.split(' ')[1].slice(0, 1).toUpperCase()}${query.sort.split(' ')[1].slice(1)}`])  : formatMessage(messages[query.sort])}
                            list={[
                                {text: formatMessage(messages.increasingPrice), value: 'increasing price'},
                                {text: formatMessage(messages.decreasingPrice), value: 'decreasing price'},
                                {text: formatMessage(messages.latest), value: 'latest'},
                                {text: formatMessage(messages.mostPopular), value: 'most popular'}
                            ]}
                            selectItemHandler={this.props.sortHandler}
                            />
                        )}
                      
                 

                    <div className="inventory__controller__group">
                        <div className="inventory__controller__group__infos">
                            <div className="inventory__controller__group__infos__key">
                                <FormattedMessage id="price" defaultMessage="price"/>
                            </div>
                            <div className="inventory__controller__group__infos__value">
                                {query.price.value.min} - {query.price.value.max}
                            </div>
                        </div>
                        <InputRange 
                            step={1000}
                            maxValue= {query.price.scope.max}
                            minValue={query.price.scope.min}
                            value={query.price.value}
                            onChange={value => this.props.changePriceHandler(value)}
                            onChangeComplete={this.props.changeComplete}/>
                    </div>

                    <div className="inventory__controller__group">
                        <div className="inventory__controller__group__infos">
                            <div className="inventory__controller__group__infos__key">
                            <FormattedMessage id="year" defaultMessage="year"/>
                            </div>
                            <div className="inventory__controller__group__infos__value">
                                {query.year.value.min} - {query.year.value.max}
                            </div>
                        </div>
                        <InputRange 
                            maxValue={query.year.scope.max }
                            minValue={query.year.scope.min } 
                            value={query.year.value}
                            onChange={value => this.props.changeYearHandler(value)}
                            onChangeComplete={this.props.changeComplete}/>
                    </div>
                </div>
        )
    }

}


const mapStateToProps = state => {
    return {
        brandAndModelsData: state.product.brandAndModelsData,
        price: state.product.price,
        bodyTypeList: state.product.bodyTypeList
    }
}

export default connect(mapStateToProps)(injectIntl(Controller))
