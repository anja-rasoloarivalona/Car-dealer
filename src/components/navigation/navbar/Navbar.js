import React from 'react'
import './Navbar.css';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import IconSvg from '../../../utilities/svg/svg';
import { NavLink} from 'react-router-dom'

const Navbar= props => {
    let userName = props.userName;
        let isAuth = props.isAuth
        return (
            <nav className={`navbarContainer 
                            ${props.scrolled ? 'fixed': ''}
                            `}>
            <ul className="navbar__list">
                    <NavLink exact to={`/`} className="navbar__list__item">
                        Home
                    </NavLink>
                    <NavLink to={`/inventory`} className="navbar__list__item">
                        Inventory
                    </NavLink>
                    <NavLink to="/services" className="navbar__list__item">
                        Services
                    </NavLink>
            </ul>

            <div className="navbar__cta">
                {!isAuth && (
                        <a className="navbar__cta__login" href="/auth">
                            <IconSvg icon="user"/>
                            <span>Login</span>
                        </a>
                )}

                {isAuth && (
                    <div className="navbar__cta__avatar"
                         onClick={() => props.history.push('/my-account')}>
                       <span>{userName.split(' ')[0].slice(0, 1)}{userName.split(' ')[1].slice(0, 1)}</span> 
                    </div>

                )}
            </div>
        </nav>
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
