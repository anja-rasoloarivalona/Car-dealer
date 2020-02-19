import React, { Component } from 'react'
import './Account.css';
import { connect } from 'react-redux';
import ProductCard from '../../components/ProductCard/ProductCard';
import * as actions from '../../store/actions'
import Messages from './Messages/Messages'
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
                                    Messages
                            </li>
                            <li className={`account__sidebar__list__item
                                            ${currentSection === 'favorites' ? 'active' : 'null'}`}
                                onClick={() => this.changeCurrentSectionHandler('favorites')}>
                                    Mes favoris
                            </li>
                            <li className={`account__sidebar__list__item
                                            ${currentSection === 'appointment' ? 'active' : 'null'}`}
                                onClick={() => this.changeCurrentSectionHandler('appointment')}>
                                    Mes rendez-vous
                            </li>
                            <li className={`account__sidebar__list__item
                                            ${currentSection === 'documents' ? 'active' : 'null'}`}
                                onClick={() => this.changeCurrentSectionHandler('documents')}>
                                    Mes documents
                            </li>
                        </ul>
                  </div>

                <div className="account__currentSection">
                    {currentSection === 'favorites' && (
                                <ul className="account__productList">
                                        {products && products.map(product => (
                                                        <ProductCard 
                                                            key= {product._id}
                                                            _id = {product._id}
                                                            mainImgUrl={product.general[0].mainImgUrl}
                                                            made={product.general[0].made}
                                                            model={product.general[0].model}
                                                            year={product.general[0].year}
                                                            price={product.general[0].price}
                                                            nbKilometers={product.general[0].nbKilometers}
                                                            gazol={product.general[0].gazol}
                                                            transmissionType={product.general[0].transmissionType}
                                                            requestProductDetails={this.requestProductDetails.bind(this)}
                                                        />
                                        ))}
                                </ul>
                    )}
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
