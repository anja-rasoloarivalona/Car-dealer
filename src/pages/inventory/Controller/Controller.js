import React, { Component } from 'react';
import './Controller.css';
import { connect } from 'react-redux';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';
import DropDownList from '../../../components/DropDownList/DropDownList'

 class Sidebar extends Component {


    componentDidMount(){
        console.log('few', this.props.query)
    }

    render() {
        const {query} = this.props;  
        let data = this.props.brandAndModelsData;

        return (
       
            <div className="inventory__controller">
                   
                        <DropDownList 
                            value={query.brand === 'all' ? 'all brands' : query.brand}
                            list={[ {text: 'all brands', value: 'all'},...Object.keys(data)]}
                            selectItemHandler={this.props.selectBrandHandler}
                        />
                  
  
                        <DropDownList 
                            value={query.model === 'all' ? 'all models' : query.model}
                            list={ query.brand !== 'all' ? [{text: 'all models', value: 'all'}, ...data[query.brand]] : ['all models']}
                            selectItemHandler={this.props.selectModelHandler}
                        />
              
                        {query.sort && (
                            <DropDownList 
                            value={query.sort}
                            list={['increasing price', 'decreasing price', 'latest', 'most popular']}
                            selectItemHandler={this.props.sortHandler}
                            />
                        )}
                      
                 

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
                            onChange={value => this.props.changePriceHandler(value)}
                            onChangeComplete={this.props.changeComplete}/>
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
        price: state.product.price
    }
}

export default connect(mapStateToProps)(Sidebar)
