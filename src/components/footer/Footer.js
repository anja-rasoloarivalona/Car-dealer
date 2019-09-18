import React from 'react';
import './Footer.css';
import IconSvg from '../../utilities/svg/svg';


import test from '../../assets/img/intro1.jpeg';

const footer = () => {
    return (
        <footer className="footer">
            <ul className="footer__list">
                <li className="footer__list__item">
                    <h3 className="footer__title">WOTO MOTORS</h3>
                    <p>
                        In tellus integer feugiat scelerisque varius morbi enim nunc faucibus. Bibendum enim facilisis gravida neque convallis a cras semper auctor. Mi sit amet mauris commodo quis imperdiet massa tincidunt nunc. 
                    </p>

                </li>
                <li className="footer__list__item">
                    <h3 className="footer__title">Gallery</h3>
                    <div className="footer__gallery">
                        <img src={test} className="footer__gallery__img" alt="cars" />
                        <img src={test} className="footer__gallery__img" alt="cars" />
                        <img src={test} className="footer__gallery__img" alt="cars" />
                    </div>
                </li>
                <li className="footer__list__item footer__list__item__siteMap">
                    <h3 className="footer__title">Site map</h3>
                    <ul className="footer__siteMap__list">
                        <li className="footer__siteMap__list__item">Accueil</li>
                        <li className="footer__siteMap__list__item">Inventaire</li>
                        <li className="footer__siteMap__list__item">À propos</li>
                        <li className="footer__siteMap__list__item">Contact</li>
                    </ul>
                </li>

                <li className="footer__list__item">
                    <h3 className="footer__title">Subscribe</h3>
                    <input className="footer__input"/>
                    <p>Get latest updates and offers</p>
                </li>
                <li className="footer__list__item">
                    <h3 className="footer__title">Social Network</h3>
                    <ul className="footer__socialNetwork__list">
                        <IconSvg icon="facebook"/>
                        <IconSvg icon="instagram"/>
                        <IconSvg icon="twitter"/>
                        <IconSvg icon="google-plus"/>
                    </ul>
                </li>
                <li className="footer__list__item footer__list__item__support">
                    <h3 className="footer__title">Support</h3>
                     <ul className="footer__support__list">
                        <li className="footer__support__list__item">Service d'assistance</li>
                        <li className="footer__support__list__item">FAQ</li>
                     </ul>
                </li>

            </ul>
            <div className="footer__copyRight">
                &copy; Anja Rasoloarivalona - 2019
            </div>
        </footer>
    )
}

export default footer;


