import React from 'react';
import './Overview.css';

const overview = () => {
    return (
        <div className="overview">

            <div>
                Ut efficitur volutpat massa id efficitur. Suspendisse purus quam, eleifend varius dolor quis, porttitor venenatis metus. Ut lectus felis, laoreet sit amet ultrices et, maximus ac quam. Morbi sit amet massa nunc. Vivamus ultrices velit vel odio viverra, eu mollis sapien vestibulum. Etiam facilisis id nisi quis consectetur. Proin nibh neque, tempus nec venenatis a, tincidunt vitae turpis. Nulla aliquam risus vel fermentum maximus.
            </div>

            <ul className="overview__list">
                <li className="overview__list__item">
                    <div className="overview__list__item__key">Marque</div>
                    <div className="overview__list__item__value">Toyota</div>
                </li>
                <li className="overview__list__item">
                    <div className="overview__list__item__key">Modèle</div>
                    <div className="overview__list__item__value">Celica</div>
                </li>
                <li className="overview__list__item">
                    <div className="overview__list__item__key">Année</div>
                    <div className="overview__list__item__value">2018</div>
                </li>
                <li className="overview__list__item">
                    <div className="overview__list__item__key">Kilométrage</div>
                    <div className="overview__list__item__value">46 000 km</div>
                </li>
                <li className="overview__list__item">
                    <div className="overview__list__item__key">Mise en circulation</div>
                    <div className="overview__list__item__value">2019</div>
                </li>
                <li className="overview__list__item">
                    <div className="overview__list__item__key">Nombre de propriétaires</div>
                    <div className="overview__list__item__value">1</div>
                </li>
                <li className="overview__list__item">
                    <div className="overview__list__item__key">Nombre de places</div>
                    <div className="overview__list__item__value">5</div>
                </li>
                <li className="overview__list__item">
                    <div className="overview__list__item__key">Couleur extérieur</div>
                    <div className="overview__list__item__value">gris</div>
                </li>
                <li className="overview__list__item">
                    <div className="overview__list__item__key">Couleur intérieur</div>
                    <div className="overview__list__item__value">gris</div>
                </li>
                <li className="overview__list__item">
                    <div className="overview__list__item__key">Numéro de référence</div>
                    <div className="overview__list__item__value">X4598Y7</div>
                </li>
                
                
            </ul>
           
        </div>
    )
}

export default overview;
