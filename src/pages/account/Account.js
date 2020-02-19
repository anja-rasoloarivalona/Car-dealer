import React, { Component } from 'react'
import './Account.css';
import { connect } from 'react-redux';
import ProductCard from '../../components/ProductCard/ProductCard';
import * as actions from '../../store/actions'
import Messages from './Messages/Messages'
import IconSvg from '../../utilities/svg/svg'
import ProductsList from '../../components/ProductsList/ProductsList'

class Account extends Component {
    state = {
        loading: true,
        currentSection: 'messages'
    }

    requestProductDetails = data => {
        this.props.setProductRequestedData(data)
        this.props.history.push(`/car/${data.productId}`)
    }

    changeCurrentSectionHandler = currentSection => {
        this.setState({ currentSection })
    }
    
    render() {

        let products = this.props.favorites;
        const { currentSection } = this.state

        return (
            <div className="account">
                  
                <div className="account__sidebar">
                        <ul className="account__sidebar__list">
                            <li className={`account__sidebar__list__item
                                            ${currentSection === 'messages' ? 'active' : 'null'}`}
                                onClick={() => this.changeCurrentSectionHandler('messages')}>
                                   <IconSvg icon="email"/>
                                   <span>Messages</span> 
                            </li>
                            <li className={`account__sidebar__list__item
                                            ${currentSection === 'favorites' ? 'active' : 'null'}`}
                                onClick={() => this.changeCurrentSectionHandler('favorites')}>
                                   <IconSvg icon="heart"/>
                                   <span>Favorites</span> 
                            </li>
                            {/* <li className={`account__sidebar__list__item
                                            ${currentSection === 'appointment' ? 'active' : 'null'}`}
                                onClick={() => this.changeCurrentSectionHandler('appointment')}>
                                    Mes rendez-vous
                            </li>
                            <li className={`account__sidebar__list__item
                                            ${currentSection === 'documents' ? 'active' : 'null'}`}
                                onClick={() => this.changeCurrentSectionHandler('documents')}>
                                    Mes documents
                            </li> */}
                        </ul>
                        <div className="account__sidebar__logout"
                             onClick={this.props.logoutHandler}
                        >
                            <span>Logout</span>
                        </div>
                </div>

                <div className="account__currentSection">


                    {currentSection === 'favorites' && products.length > 0 && ( <ProductsList productsList={products}/>
                    )}
                    {currentSection === 'favorites' && products.length < 1 && <div className="no-favorite">No favorite products</div>}


                    {currentSection === 'messages' && <Messages /> }
                    {currentSection === 'appointment' && (
                            <section className="account__section account__appointment">
                                Rendez-vous
                            </section>
                    )}
                    {currentSection === 'documents' && (
                            <section className="account__section account__documents">
                                documents
                            </section>
                    )}
                </div>        
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        userId: state.auth.userId,
        favorites: state.user.favorites
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setProductRequestedData : data =>  dispatch(actions.setProductRequestedData(data)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Account)
