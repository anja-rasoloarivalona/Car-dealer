import React, { Component } from 'react'
import './Services.css'
import IconSvg from '../../utilities/svg/svg'
import { connect } from 'react-redux'
import { FormattedMessage, defineMessages, injectIntl } from 'react-intl'


const messages = defineMessages({
    purchase: {
        id: "purchase",
        defaultMessage: "purchase"
    },
    vehicle_paper: {
        id: "vehicle_paper",
        defaultMessage: "vehicle_paper"
    },
    customs_clearance: {
        id: "customs_clearance",
        defaultMessage: "customs_clearance"
    },
    insurance: {
        id: "insurance",
        defaultMessage: "insurance"
    },

})

class Services extends Component {

    componentDidMount(){
        window.scrollTo(0 , 0)
        // this.props.history.push({
        //     pathname: this.props.history.pathname,
        //     search: `currency=${this.props.currency}&lang=${this.props.lang}`
        //   })
    }

    render() {

        const {formatMessage } = this.props.intl
 
    let data = {
        [formatMessage(messages.purchase)] : [
            'basic', 'conventionnel', 'tranquility', 'clés en main'
        ],
        [formatMessage(messages.vehicle_paper)]: [
            'basic', 'conventionnel', 'tranquility', 'clés en main'
        ],
        transport: [
            'conventionnel', 'tranquility', 'clés en main'
        ],
        [formatMessage(messages.customs_clearance)]: [
            'conventionnel', 'tranquility', 'clés en main'
        ],
        [formatMessage(messages.insurance)] : [
           'tranquility', 'clés en main'
        ],
    }

    let header = ['basic', 'conventionnel', 'tranquility', 'clés en main'];


        return (
            <div className="services">
            <header className="services__header">
                <h1 className="services__header__title"><FormattedMessage id="yourNextCarHere" defaultMessage="your next car is here"/></h1>
                <div className="services__header__text">
                    <FormattedMessage id="serviceText" defaultMessage="Wherever you are, we have what you need. We offer 4 different types of service depending on the place of delivery. We also give our customers the possibility to choose a customized package. Therefore, we invite you to contact one of our agents."/>
                </div>
            </header>

                <table className="services__table">
                    <thead className="services__table__header">
                        <tr>
                            <th>&nbsp;</th>
                            {header.map( (forfait, index) => (
                                <th key={index}>{forfait}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="services__table__data">
                    {Object.keys(data).map( (option, index) => (
                        <tr key={index} className="services__table__data__row">
                            <td>
                                {option.split('_').length > 1 ? `${option.split('_')[0]}     ${option.split('_')[1]} ${option.split('_')[2] !== undefined ? option.split('_')[2] : "" }    `: option}
                            </td>
                            {header.map( (forfait, index) => {
                                if(data[option].includes(forfait)){
                                    return (
                                    <td className="services__table__data__row__checked" key={index}>
                                        <IconSvg icon="checkmark"/>
                                    </td>
                                    )
                                } else return(
                                    <td className="services__table__data__row__unchecked" key={index}>
                                        <IconSvg icon="cross"/>
                                    </td>
                                    )
                            })}
                        </tr>                   
                    ))}            
                </tbody>
                </table>

            
            
        </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        lang: state.parameters.lang,
        currency: state.parameters.currency
    }
}

export default  connect(mapStateToProps)(injectIntl(Services))