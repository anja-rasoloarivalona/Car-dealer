import React, { Component } from 'react'
import "./MobileNav.css"
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import IconSvg from '../../../utilities/svg/svg';
import { NavLink, Link} from 'react-router-dom'
import DropDownList from '../../DropDownList/DropDownList'
import * as actions from "../../../store/actions";

class MobileNav extends Component {

    state = {
        showNavList: false,
        showLogout: false
    }
    toggleNavList = () => {
        this.setState(prevState => ({
            ...prevState,
            showNavList: !prevState.showNavList
        }))
    }

    toggleShowLogout = () => {
        this.setState( prevState => ({
            ...prevState,
            showLogout: !prevState.showLogout
        }))
    }

    setCurrency = currency => {
        this.props.history.push({
            pathname: this.props.history.pathname,
            search: `lang=${this.props.lang}&currency=${currency}`
        })
        this.props.setCurrency(currency)
       this.toggleNavList()
    }

    setLang = lang => {
        this.props.history.push({
            pathname: this.props.history.pathname,
            search: `lang=${lang}&currency=${this.props.currency}`
        })
        this.props.setLang(lang)
        this.toggleNavList()
    }
    render() {
        const { showNavList, showLogout } = this.state
        let userName = this.props.userName;
        let isAuth = this.props.isAuth
        return (
            <div className="mobile-nav">

                <div className="mobile-nav__group">
                    <div className="mobile-nav__toggler" onClick={this.toggleNavList}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <div className="mobile-nav__logo">
                    <Link to="/inventory">                  
                            WOTO
                    </Link>
                    </div>
                   
                </div>

                <div className="mobile-nav__group">

                    <Link to="/my-account/messages">
                        <IconSvg icon="email"/>
                    </Link>
                    <Link to="/my-account/favorites">
                        <IconSvg icon="heart"/>
                    </Link>
                    

                    {!isAuth && (
                        <Link className="mobile-nav__login" to="/auth">
                            Login
                        </Link>
                    )}

                    {isAuth && window.innerWidth > 738 && (
                        <Link className="mobile-nav__avatar" to="/my-account/messages">
                            <span>{userName.split(' ')[0].slice(0, 1)}{userName.split(' ')[1].slice(0, 1)}</span> 
                        </Link>
                    )}
                    {isAuth && window.innerWidth <= 738 && (

                        <div className="mobile-nav__avatar" to="/my-account/messages" onClick={this.toggleShowLogout}>
                            <span>{userName.split(' ')[0].slice(0, 1)}{userName.split(' ')[1].slice(0, 1)}</span> 

                            <div className={`mobile-nav__logout ${showLogout ? 'show': ''}`}
                                 onClick={this.props.logoutHandler}>
                                Logout
                            </div>

                        </div>


                    )}
          



                </div>

               
                


                {showNavList && (<div className="mobile-nav__backdrop" onClick={this.toggleNavList}></div> )} 
                <div className={`mobile-nav__listContainer  ${showNavList ? 'show' : ''}`}>
                    <ul className={`mobile-nav__list`}>
                        <NavLink exact to={`/`} className="mobile-nav__list__item" onClick={this.toggleNavList}>
                            Home
                        </NavLink>
                        <NavLink to={`/inventory`} className="mobile-nav__list__item" onClick={this.toggleNavList}>
                            Inventory
                        </NavLink>
                        <NavLink to="/services" className="mobile-nav__list__item" onClick={this.toggleNavList}>
                            Services
                        </NavLink>
                    </ul>
                    <div className="mobile-nav__parameters">
                            <DropDownList 
                                value={this.props.lang}
                                list={['english', 'spanish', 'french']}
                                selectItemHandler={this.setLang}
                            />
                            <DropDownList 
                                value={this.props.currency}
                                list={['CAD', 'USD','EUR']}
                                selectItemHandler={this.setCurrency}
                            />
                    </div>
                    <div className="mobile-nav__list__socialMedia">
                            <IconSvg icon="facebook"/>
                            <IconSvg icon="instagram"/>
                            <IconSvg icon="twitter"/>
                        </div>
                </div>

               

            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuth: state.auth.auth,
        userName: state.auth.userName,
        lang: state.parameters.lang,
        currency: state.parameters.currency,
    }
}

const mapDispacthToProps = dispatch => {
    return {
        setLang: lang => dispatch(actions.setLang(lang)),
        setCurrency: currency => dispatch(actions.setCurrency(currency)),
    }
}

export default  connect(mapStateToProps, mapDispacthToProps)( withRouter(MobileNav))
