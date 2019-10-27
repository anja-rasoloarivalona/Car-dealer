import React from 'react';
import './Navbar.css';
import { NavLink } from 'react-router-dom';


import Button from '../../button/Button';

import { connect } from 'react-redux';
import { Spring} from 'react-spring/renderprops'


const navbar = props => {

    let pos = props.pos;

    return (
        <Spring
          from={{marginBottom: 0}}
          to = {{ marginBottom: 0}}
          config={{delay: 1000}}>
              {
                  styleProps => (
                 
                            <nav className={`navbarContainer
                                ${pos < -1 ? 'fixed' : ''}`} style={styleProps}>
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
                                    <NavLink to="/car" className="navbar__list__item">
                                        CAR
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

            
        </Spring>
    )
}

const mapStateToProps = state => {
    return {
        isAuth: state.auth.auth
    }
}
export default connect(mapStateToProps)(navbar);
