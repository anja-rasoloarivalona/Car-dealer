import React from 'react';
import './Navbar.css';
import { NavLink } from 'react-router-dom';


const navbar = () => {
    return (    
            <nav className="navbarContainer">
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
            </nav>
        
    )
}

export default navbar;
