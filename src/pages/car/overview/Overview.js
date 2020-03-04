import React from 'react';
import './Overview.css';
import IconSvg from '../../../utilities/svg/svg';
import { FormattedMessage } from 'react-intl'

const overview = props => {
    let product = props.product
    return (
        <div className="overview">
            <section className="overview__section">
                <div className="overview__title">
                    <IconSvg icon="file"/>
                    <div><FormattedMessage id="general" defaultMessage="general"/></div>
                </div>
                <ul className="overview__list">
                <li className="overview__list__item">
                    <div className="overview__list__item__key"><FormattedMessage id="brand" defaultMessage="brand" /></div>
                    <div className="overview__list__item__value">{product.general.brand}</div>
                </li>
                <li className="overview__list__item">
                    <div className="overview__list__item__key"><FormattedMessage id="model" defaultMessage="model" /></div>
                    <div className="overview__list__item__value">{product.general.model}</div>
                </li>
                <li className="overview__list__item">
                    <div className="overview__list__item__key"><FormattedMessage id="body type" defaultMessage="body type" /></div>
                    <div className="overview__list__item__value">{product.general.bodyType}</div>
                </li>
                <li className="overview__list__item">
                    <div className="overview__list__item__key"><FormattedMessage id="year" defaultMessage="year" /></div>
                    <div className="overview__list__item__value">{product.general.year}</div>
                </li>
                <li className="overview__list__item">
                    <div className="overview__list__item__key"><FormattedMessage id="kilometers" defaultMessage="kilometers" /></div>
                    <div className="overview__list__item__value">{product.general.nbKilometers.toLocaleString()} km</div>
                </li>
                <li className="overview__list__item">
                    <div className="overview__list__item__key"><FormattedMessage id="yearOfRelease" defaultMessage="year of release" /></div>
                    <div className="overview__list__item__value">{product.general.yearOfRelease}</div>
                </li>
                <li className="overview__list__item">
                    <div className="overview__list__item__key"><FormattedMessage id="serialNumber" defaultMessage="serial number" /></div>
                    <div className="overview__list__item__value">{product.general.serialNumber}</div>
                </li>
               
            </ul>
            </section>
            <section className="overview__section">
                <div className="overview__title">
                    <IconSvg icon="design"/>
                    <div>Design</div>
                </div>
                <ul className="overview__list">
                    <li className="overview__list__item">
                        <div className="overview__list__item__key"><FormattedMessage id="interiorColor" defaultMessage="interior color"/></div>
                        <div className="overview__list__item__value">{product.design.intColor}</div>
                    </li>
                    <li className="overview__list__item">
                        <div className="overview__list__item__key"><FormattedMessage id="exteriorColor" defaultMessage="exterior color"/></div>
                        <div className="overview__list__item__value">{product.design.extColor}</div>
                    </li>                            
            </ul>
            </section>
        </div>
    )
}

export default overview;
