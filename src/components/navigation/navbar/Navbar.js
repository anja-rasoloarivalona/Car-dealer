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
                    Accueil
                                    </NavLink>
                <NavLink to="/inventaire" className="navbar__list__item">
                    Inventaire
                                    </NavLink>
                <NavLink to="/services" className="navbar__list__item">
                    Services
                                    </NavLink>
                <NavLink to="/contact" className="navbar__list__item">
                    Contact
                                    </NavLink>
                <NavLink to="/mon-compte" className="navbar__list__item">
                    Profil
                                    </NavLink>
            </ul>

            <div className="navbar__cta">
                {
                    !props.isAuth && ((
                        <Button color='primary' link='/auth'
                            customClass='auth__cta'>
                            Se connecter
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
