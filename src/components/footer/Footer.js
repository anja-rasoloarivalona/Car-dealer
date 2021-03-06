import React, { Component } from 'react'
import './Footer.css';
import IconSvg from '../../utilities/svg/svg';
import DropDownList from '../DropDownList/DropDownList';
import * as actions from '../../store/actions'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import { FormattedMessage } from 'react-intl'

class Footer extends Component {

    state = {
        susbscribed: false,
        subscribeInput: ''
    }
    changeInputHandler = value => {
        this.setState({ subscribeInput: value })
    }

    subscribeHandler = () => {
        this.setState({
            susbscribed: true,
            subscribeInput: ''
        })
    }

    setCurrencyHandler = currency => {
        this.props.history.push({
            pathname: this.props.history.pathname,
            search: `lang=${this.props.lang}&currency=${currency}`
        })
        this.props.setCurrency(currency)
        
        window.scrollTo(0 , 0)
    }
    render() {

        const {susbscribed, subscribeInput} = this.state
        const { hide } = this.props
        return (
            <footer className={`footer ${hide ? 'hide' : ''}`}>
            <ul className="footer__list">

                <li className="footer__list__group">
                    <div className="footer__list__item">
                        <h3 className="footer__title">WOTO Motors</h3>
                        <p>
                            <FormattedMessage id="wotoFooter" defaultMessage="Woto motors is a car dealership based in Quebec. We deliver vehicles all over the world. For more information, log into your woto account and communicate with our agents."/>
                        </p>
                    </div>
                    <div className="footer__list__item">
                        <h3 className="footer__title"><FormattedMessage id="siteMap" defaultMessage="site map"/></h3>
                        <ul className="footer__list__item__list">
                            <li className="footer__list__item__list__item">
                               <a href="/"><FormattedMessage id="home" defaultMessage="home"/></a>
                            </li>
                            <li className="footer__list__item__list__item">
                                <a href="/inventory"><FormattedMessage id="inventory" defaultMessage="inventory"/></a>
                            </li>
                            <li className="footer__list__item__list__item">
                                <a href="/services"><FormattedMessage id="services" defaultMessage="services"/></a>
                            </li>
                        </ul>
                    </div>
                </li>



                <li className="footer__list__group">
                    <div className="footer__list__item">
                        <h3 className="footer__title"><FormattedMessage id="subscribe" defaultMessage="subscribe"/></h3>

                        <div className="footer__inputContainer">
                            <input className="footer__input"
                                value={subscribeInput}
                                type="email"
                                placeholder="email"
                                onChange={e => this.changeInputHandler(e.target.value)}
                            />
                            <IconSvg icon="send"
                                onClick={this.subscribeHandler}
                            />
                        </div>
                        
                        {susbscribed && (
                            <p><FormattedMessage id="youVeBeenSubscribed" defaultMessage="You've been subscribed. Thank you for joining us"/></p>
                        )}
                         {!susbscribed && (
                            <p><FormattedMessage id="getLastUpdate" defaultMessage="Get latest updates and offers"/></p>
                        )}

                       
                    </div>
                    <div className="footer__list__item">
                        <h3 className="footer__title"><FormattedMessage id="parameters" defaultMessage="parameters"/></h3>
                        <ul className="footer__list__item__list">
                            <li className="footer__list__item__list__item">
                                <DropDownList 
                                    value={this.props.lang}
                                    list={['english', 'spanish', 'french']}
                                    selectItemHandler={this.props.setLang}
                                />
                            </li>
                            <li className="footer__list__item__list__item">
                                <DropDownList 
                                    value={this.props.currency}
                                    list={['CAD', 'USD', 'EUR']}
                                    selectItemHandler={this.setCurrencyHandler}
                                />
                            </li>
                            
                     </ul>
                    </div>     
                </li>    
            </ul>


            <div className="footer__copyRight">
                <span>&copy; Anja Rasoloarivalona - 2019</span>
                <ul className="footer__socialNetwork__list">
                        <IconSvg icon="facebook"/>
                        <IconSvg icon="instagram"/>
                        <IconSvg icon="twitter"/>
                        <IconSvg icon="google-plus"/>
                    </ul>
            </div>
        </footer>
        )
    }
}


const mapStateToProps = state => {
    return {
        lang: state.parameters.lang,
        currency: state.parameters.currency
    }
}

const mapDispacthToProps = dispatch => {
    return {
        setLang: lang => dispatch(actions.setLang(lang)),
        setCurrency: currency => dispatch(actions.setCurrency(currency))
    }
}

export default connect(mapStateToProps, mapDispacthToProps)(withRouter(Footer));


