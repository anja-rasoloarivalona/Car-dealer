import React from 'react';
import './Home.css';
import IconSvg from '../../utilities/svg/svg';
import { Route, Switch} from 'react-router-dom';


import HomeInventory from './homeInventory/HomeInventory';
import HomeSearch from './homeSearch/HomeSearch';


import HomeService from './homeService/HomeService';

const home = () => {

    return (
        <div className="home">

            <section className="home__intro">

            </section>

            <section className="home__router">

                <div className="home__router__nav">
                    <h1><span>WELCOME TO&nbsp;</span><span>WOTO MOTORS</span></h1>
                    <nav className="home__router__nav__list">
                        <li className="home__router__nav__list__item">Inventory</li>
                        <li className="home__router__nav__list__item">Search</li>
                        <li className="home__router__nav__list__item">Contact</li>
                    </nav>
                    <div className="home__router__nav__count">
                        <IconSvg icon="car"/>
                        <div>Available 99 cars</div>
                    </div>
                </div>

            </section>

            <Switch>
                <Route path="/" exact component={HomeInventory}/>
                <Route path="/search" component={HomeSearch}/>
            </Switch>

            <HomeService />
            
        </div>
    )
}

export default home;
