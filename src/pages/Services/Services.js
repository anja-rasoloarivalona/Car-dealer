import React, { Component } from 'react'
import './Services.css'
import IconSvg from '../../utilities/svg/svg'


class Services extends Component {

    componentDidMount(){
        window.scrollTo(0 , 0)
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
                            {header.map(forfait => (
                                <th>{forfait}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="services__table__data">
                    {Object.keys(data).map(option => (
                        <tr className="services__table__data__row">
                            <td>
                                {option.split('_').length > 1 ? `${option.split('_')[0]} ${option.split('_')[1]}`: option}
                            </td>
                            {header.map(forfait => {
                                if(data[option].includes(forfait)){
                                    return (
                                    <td className="services__table__data__row__checked">
                                        <IconSvg icon="checkmark"/>
                                    </td>
                                    )
                                } else return(
                                    <td className="services__table__data__row__unchecked">
                                        <IconSvg icon="close"/>
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

export default  Services