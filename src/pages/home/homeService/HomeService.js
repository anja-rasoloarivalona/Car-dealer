import React from 'react';
import './HomeService.css';
import IconSvg from '../../../utilities/svg/svg';
import Button from '../../../components/button/Button';

const homeService = () => {
    return (
        <section className="home-service">
            <h1 className="home-service__title">Nos offres</h1>

            <ul className="home-service__list">
                <li className="home-service__list__item">
                    <IconSvg icon="buy"/>
                    <div className="home-service__list__item__text">
                        <h2 className="home-service__list__item__text__title">Basic</h2>
                        <p className="home-service__list__item__text__para">Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression.</p>
                    </div>
                </li>
                <li className="home-service__list__item">
                    <IconSvg icon="contract"/>
                    <div className="home-service__list__item__text">
                        <h2 className="home-service__list__item__text__title">Conventionnel</h2>
                        <p className="home-service__list__item__text__para">Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression.</p>
                    </div>
                </li>
                <li className="home-service__list__item">
                    <IconSvg icon="yoga"/>
                    <div className="home-service__list__item__text">
                        <h2 className="home-service__list__item__text__title">Tranquility</h2>
                        <p className="home-service__list__item__text__para">Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression.</p>
                    </div>
                </li>
                <li className="home-service__list__item">
                    <IconSvg icon="key"/>
                    <div className="home-service__list__item__text">
                        <h2 className="home-service__list__item__text__title">Clés en main</h2>
                        <p className="home-service__list__item__text__para">Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression.</p>
                    </div>
                </li>
            </ul>
        
            <Button color="primary">
                LEARN MORE
            </Button>
        </section>
    )
}

export default homeService;
