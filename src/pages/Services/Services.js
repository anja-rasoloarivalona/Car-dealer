import React, { Component } from 'react'
import './Services.css'
import IconSvg from '../../utilities/svg/svg'
import { connect } from 'react-redux'


class Services extends Component {

    componentDidMount(){
        window.scrollTo(0 , 0)
        this.props.history.push({
            pathname: this.props.history.pathname,
            search: `lang=${this.props.lang}&currency=${this.props.currency}`
          })
    }

    render() {
 
    let data = {
        purchase : [
            'basic', 'conventionnel', 'tranquility', 'clés en main'
        ],
        vehicle_paper: [
            'basic', 'conventionnel', 'tranquility', 'clés en main'
        ],
        transport: [
            'conventionnel', 'tranquility', 'clés en main'
        ],
        customs_clearance: [
            'conventionnel', 'tranquility', 'clés en main'
        ],
        insurance : [
           'tranquility', 'clés en main'
        ],
    }

    let header = ['basic', 'conventionnel', 'tranquility', 'clés en main'];


        return (
            <div className="services">
            <header className="services__header">
                <h1 className="services__header__title">Your next car is here</h1>
                <div className="services__header__text">
                    Maecenas iaculis diam ac orci fringilla, rutrum congue nunc bibendum. Duis egestas orci non justo pharetra commodo. Fusce augue nisi, varius id orci at, porttitor gravida tellus. Proin condimentum justo sapien, sed aliquet libero tincidunt commodo. Proin euismod nulla erat, sed hendrerit erat congue eu. Ut dolor odio, feugiat non neque ut, euismod bibendum leo. Duis tempus volutpat efficitur. Praesent fringilla enim tellus, sed semper ligula feugiat nec.
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
                                {option.split('_').length > 1 ? `${option.split('_')[0]} ${option.split('_')[1]}`: option}
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

export default  connect(mapStateToProps)(Services)