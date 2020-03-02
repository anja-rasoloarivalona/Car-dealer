import React from 'react'
import './Navbar.css';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import IconSvg from '../../../utilities/svg/svg';
import { NavLink, Link} from 'react-router-dom'

const Navbar= props => {
    let userName = props.userName;
        let isAuth = props.isAuth
        return (
            <nav className={`navbarContainer 
                            ${props.scrolled ? 'fixed': ''}
                            `}>
            <ul className="navbar__list">
                    <NavLink exact to="/Car-dealer" className="navbar__list__item">
                        Home
                    </NavLink>
                    <NavLink to="Car-dealer/inventory" className="navbar__list__item">
                        Inventory
                    </NavLink>
                    <NavLink to="Car-dealer/services" className="navbar__list__item">
                        Services
                    </NavLink>
            </ul>

            <div className="navbar__cta">

                
                {!isAuth && (
                        <Link className="navbar__cta__login" to="Car-dealer/auth">
                            <IconSvg icon="user"/>
                            <span>Login</span>
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
