import React from 'react';
import './Technical.css';
import IconSvg from '../../../utilities/svg/svg';
import { FormattedMessage } from 'react-intl'

const technical = props => {
   let product = props.product;
    return (
        <div className="technical">


            <div className="technical__section">
                <div className="technical__title">
                    <IconSvg icon="engine"/>
                    <div><FormattedMessage id="engine"  defaultMessage="engine"/></div>
                </div>
                <ul className="technical__section__list">
                    <li className="technical__section__list__item">
                        <span className="technical__section__list__item__detail"><FormattedMessage id="motorSize"  defaultMessage="motor size"/></span>
                        <span className="technical__section__list__item__value">{product.tech.motorSize}</span>
                    </li>
                    <li className="technical__section__list__item">
                        <span className="technical__section__list__item__detail"><FormattedMessage id="numberOfCylinders"  defaultMessage="number of cylinders"/></span>
                        <span className="technical__section__list__item__value">{product.tech.nbCylinders}</span>
                    </li>
                    <li className="technical__section__list__item">
                        <span className="technical__section__list__item__detail"><FormattedMessage id="fuel"  defaultMessage="fuel"/></span>
                        <span className="technical__section__list__item__value">{product.general.gazol}</span>
                    </li>
                    <li className="technical__section__list__item">
                        <span className="technical__section__list__item__detail"><FormattedMessage id="maxSpeed"  defaultMessage="max speed"/></span>
                        <span className="technical__section__list__item__value">{product.tech.maxSpeed} km/h</span>
                    </li>
                </ul>
            </div>

            {/* <div className="technical__section">
                <div className="technical__title">
                    <IconSvg icon="speedometer"/>
                    <div>Performance</div>
                </div>
                <ul className="technical__section__list">
                    
                    <li className="technical__section__list__item">
                        <span className="technical__section__list__item__detail">0 à 100 km/h</span>
                        <span className="technical__section__list__item__value">10.6 s</span>
                    </li>
                </ul>
            </div> */}
            <div className="technical__section">
                <div className="technical__title">
                    <IconSvg icon="gear"/>
                    <div>Transmission</div>
                </div>
                <ul className="technical__section__list">
                    <li className="technical__section__list__item">
                        <span className="technical__section__list__item__detail"><FormattedMessage id="gearBox" defaultMessage="gear box"/></span>
                        <span className="technical__section__list__item__value">{product.general.transmissionType}</span>
                    </li>
                    <li className="technical__section__list__item">
                        <span className="technical__section__list__item__detail"><FormattedMessage id="numberGearRatios" defaultMessage="number of gear ratios"/></span>
                        <span className="technical__section__list__item__value">{product.tech.nbGearRatios}</span>
                    </li>
                </ul>
            </div>
            
            
        </div>
    )
}

export default technical;