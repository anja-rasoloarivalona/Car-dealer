import React from 'react';
import './ProductCard.css';
import IconSvg from '../../utilities/svg/svg';

const ProductCard = props  => {

    return (
        <article className="product-card"
                 onClick={() => props.requestProductDetails(props._id)}>
                    <img src={props.mainImgUrl} className="product-card__img" alt="car"/>
                    
                    <div className="product-card__details">
                        <div className="product-card__details__model">
                            <span>{props.made}&nbsp;{props.model}</span>
                            <span>{props.year}</span>
                        </div>
                        <div className="product-card__details__price">
                            {props.price} &nbsp; MRU
                        </div>
                    </div>

                    <ul className="product-card__details__specList">
                        <li className="product-card__details__specList__item">
                            <span>{props.nbKilometers}</span>
                            <IconSvg icon="road"/>    
                        </li>
                        <li className="product-card__details__specList__item">
                            <span>{props.gazol}</span>
                            <IconSvg icon="gas-station"/>
                        </li>
                        <li className="product-card__details__specList__item">
                            <span>{props.transmissionType}</span>
                            <IconSvg icon="gear"/>
                        </li>
                    </ul>
                </article>
    )
}

export default ProductCard
