import React, { Fragment } from 'react'
import './Navbar.css';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import IconSvg from '../../../utilities/svg/svg';
import { NavLink, Link} from 'react-router-dom';
import { FormattedMessage } from 'react-intl'

const Navbar= props => {
    let userName = props.userName;
        let isAuth = props.isAuth
        return (
            <Fragment>
                <div className="navbarFiller"></div>
                <nav className={`navbarContainer ${props.scrolled ? 'fixed': ''}`}>
                    <ul className="navbar__list">
                        <NavLink exact to="/" className="navbar__list__item">
                            <FormattedMessage id="home" defaultMessage="home"/>
                        </NavLink>
                        <Link to="../inventory" className={`navbar__list__item ${props.location.pathname.includes('inventory') ?  'active' : ''}`}>
                            <FormattedMessage id="inventory" defaultMessage="inventory"/>
                        </Link>
                        <Link to="../services" className={`navbar__list__item ${props.location.pathname.includes('services') ?  'active' : ''}`}>
                            <FormattedMessage id="services" defaultMessage="services"/>
                        </Link>
                    </ul>
                    <div className="navbar__cta">
                    {!isAuth && (
                            <Link className="navbar__cta__login" to="../auth">
                                <IconSvg icon="user"/>
                                <span><FormattedMessage id="login" defaultMessage="login"/></span>
                            </Link>
                    )}
                    {isAuth && (
                        <div className="navbar__cta__avatar"
                            onClick={() => props.history.push('/my-account/messages')}>
                        <span>{userName.split(' ')[0].slice(0, 1)}{userName.split(' ')[1].slice(0, 1)}</span> 
                        </div>
                    )}
                </div>
            </nav>
        </Fragment>
        )
}
const mapStateToProps = state => {
    return {
        isAuth: state.auth.auth,
        userName: state.auth.userName,
        lang: state.parameters.lang
    }
}
export default connect(mapStateToProps)(withRouter(Navbar));
