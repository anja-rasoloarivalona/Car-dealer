import React from 'react';
import './Navbar.css';
import { NavLink } from 'react-router-dom';


import Button from '../../button/Button';

import { connect } from 'react-redux';



const navbar = props => {
    return (

        <nav className={`navbarContainer`}>
            <ul className="navbar__list">
                <NavLink to="/" exact className="navbar__list__item">
                    Home
                                    </NavLink>
                <NavLink to="/inventory" className="navbar__list__item">
                    Inventory
                                    </NavLink>
                <NavLink to="/services" className="navbar__list__item">
                    Services
                                    </NavLink>
                {/* <NavLink to="/contact" className="navbar__list__item">
                    Contact
                                    </NavLink> */}
                {/* <NavLink to="/my-account" className="navbar__list__item">
                    Profil
                </NavLink> */}
            </ul>

            <div className="navbar__cta">
                {
                    !props.isAuth && ((
                        <Button color='primary' link='/auth'
                            customClass='auth__cta'>
                            Login
                                            </Button>
                    ))
                }

                {
                    props.isAuth && (
                        <Button color='secondary'
                            customClass='auth__cta'
                            onClick={props.logoutHandler}>
                            Logout
                                                </Button>
                    )
                }

            </div>
        </nav>



    )
}

const mapStateToProps = state => {
    return {
        isAuth: state.auth.auth
    }
}
export default connect(mapStateToProps)(navbar);
