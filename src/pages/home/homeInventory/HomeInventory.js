import React from 'react';
import './HomeInventory.css';
import IconSvg from '../../../utilities/svg/svg';


import intro1 from '../../../assets/img/intro1.jpeg';
import intro2 from '../../../assets/img/intro2.jpg';
import intro3 from '../../../assets/img/intro3.jpg';
import intro4 from '../../../assets/img/intro4.jpg';

const homeInventory = () => {
    return (
        <div className="home-inventory">
            <ul className="home-inventory__list">

                <li className="home-inventory__list__item">
                    <img src={intro1} className="home-inventory__list__item__img" alt="car"/>
                    
                    <div className="home-inventory__list__item__details">
                        <div className="home-inventory__list__item__details__model">
                            <span>Nissan Elantra</span>
                            <span>2016</span>
                        </div>
                        <div className="home-inventory__list__item__details__price">
                            1 200 000 MRU
                        </div>
                    </div>

                    <ul className="home-inventory__list__item__details__specList">
                        <li className="home-inventory__list__item__details__specList__item">
                            <span>18 000</span>
                            <IconSvg icon="road"/>    
                        </li>
                        <li className="home-inventory__list__item__details__specList__item">
                            <span>Essence</span>
                            <IconSvg icon="gas-station"/>
                        </li>
                        <li className="home-inventory__list__item__details__specList__item">
                            <span>Manuel</span>
                            <IconSvg icon="gear"/>
                        </li>
                    </ul>
                </li>


                <li className="home-inventory__list__item">
                    <img src={intro2} className="home-inventory__list__item__img" alt="car"/>
                </li>
                <li className="home-inventory__list__item">
                    <img src={intro3} className="home-inventory__list__item__img" alt="car"/>
                </li>
                <li className="home-inventory__list__item">
                    <img src={intro4} className="home-inventory__list__item__img" alt="car"/>
                </li>
                <li className="home-inventory__list__item">
                    <img src={intro4} className="home-inventory__list__item__img" alt="car"/>
                </li>
                <li className="home-inventory__list__item">
                    <img src={intro4} className="home-inventory__list__item__img" alt="car"/>
                </li>
            </ul>
        </div>
    )
}

export default homeInventory;