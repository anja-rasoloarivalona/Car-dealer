import React from 'react';
import './Navbar.css'

const navbar = () => {
    return (
        
            <nav className="navbarContainer">
                <ul className="navbar__list">
                    <li className="navbar__list__item">Accueil</li>
                    <li className="navbar__list__item">Inventaire</li>
                    <li className="navbar__list__item">Services</li>
                    <li className="navbar__list__item">Contact</li>
                </ul>
            </nav>
        
    )
}

export default navbar;
