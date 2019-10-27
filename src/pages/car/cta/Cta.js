import React, { Component } from 'react'
import './Cta.css';
import IconSvg from '../../../utilities/svg/svg';
import DatePicker, {registerLocale} from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from '../../../components/timePicker/TimePicker';
import { fr } from 'date-fns/locale';
import Button from '../../../components/button/Button';
registerLocale('fr', fr)

class Cta extends Component {

    state = {
        productPrice: this.props.product.general[0].price,
        forfaitPrice: 1000,
        totalPrice: this.props.product.general[0].price + 1000,

        startDate: new Date(),   

        timeSelected: '08:00'

    }

    selectForfaitHandler = price => {
        this.setState({ forfaitPrice: price, totalPrice: this.state.productPrice + price})  
    }

    handleChange = date => {
        this.setState({
          startDate: date
        }, () => console.log('date', this.state.startDate));
    };

      selectTimeHandler = time => {
        this.setState({ timeSelected: time})
      }



    render() {

        let product = this.props.product;
        const { totalPrice } = this.state
        return (
            <section className="car__cta">

                        <div className="car__cta__price">
                            {product.general[0].price} MRU
                        </div>

                        <div className="car__cta__calculator">

                            <div className="car__cta__calculator__item">
                                <div className="car__cta__calculator__item__key">
                                    Our price
                                </div>
                                <div className="car__cta__calculator__item__value">
                                    {product.general[0].price}
                                </div>
                            </div>

                            <div className="car__cta__calculator__item">

                                <div className="car__cta__calculator__item__keyContainer">
                                    <div className="car__cta__calculator__item__key">
                                       <span>Forfait</span>  <IconSvg icon="info"/>
                                    </div>
                                    <select className="car__cta__calculator__item__select"
                                            onChange={e => this.selectForfaitHandler(parseInt(e.target.value))}>
                                        <option value={1000}>Basic</option>
                                        <option value={2000}>Conventionnel</option>
                                        <option value={3000}>Tranquility</option>
                                        <option value={4000}>Clés en main</option>
                                    </select>
                                </div>


                                <div className="car__cta__calculator__item__value">
                                    {this.state.forfaitPrice} 
                                </div>            
                            </div>

                            <div className="car__cta__calculator__item">
                                <div className="car__cta__calculator__item__key">
                                    Prix TTC *
                                </div>
                                <div className="car__cta__calculator__item__value">
                                   {totalPrice } MRU 
                                </div>
                            </div>

                            <div className="todo">*Le prix total indiqué ci-dessus est à titre indicatif</div>


                        </div>
                        <div className="car__cta__appointment">
                            
                            <div className="car__cta__appointment__title">Rendez-vous</div>
                            <div className="car__cta__appointment__body">
                                <div>Prenez rendez-vous avec l'un de nos conseillers pour plus d'informations</div>
                                
                                
                                <div className="car__cta__appointment__detail">
                                    <div className="car__cta__appointment__detail__key">Date: </div>
                                    <div className="car__cta__appointment__detail__date">
                                        <DatePicker
                                            locale='fr' 
                                            showPopperArrow={false}
                                            selected={this.state.startDate}
                                            onChange={this.handleChange}
                                        />
                                        <div className="car__cta__appointment__detail__date__value">
                                            {this.state.startDate.toLocaleDateString(fr)}
                                        </div>
                                    </div>
                                    
                                </div>
                                <div className="car__cta__appointment__detail"
                                    ref={outer => this.outer = outer}>
                                        <div className="car__cta__appointment__detail__key">
                                            Heure:
                                        </div>
                                        <TimePicker timeSelected={this.state.timeSelected}
                                                    selectTimeHandler={this.selectTimeHandler}             
                                                    outer={this.outer}/>
                                </div>
                                <div className="car__cta__appointment__button">
                                    <Button color='primary'>
                                        Prendre
                                    </Button>
                                </div>
                                
                                


                                
                            </div>
                            

                        </div>
                </section>
        )
    }
}

export default Cta