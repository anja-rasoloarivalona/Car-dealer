import React from 'react';
import './Navtop.css';
import IconSvg from '../../../utilities/svg/svg';
import DropDownList from '../../DropDownList/DropDownList';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions'

const navtop = props => {
    return (
        <div className="navtop">
            <div className="navtop__logo">
                WOTO
            </div>
            <div className="navtop__contact">
                <div className="navtop__contact__detail">
                    <IconSvg icon="phone" />
                    <div>+1 438 896 2026</div>
                </div>
                <div className="navtop__contact__detail">
                    <IconSvg icon="email" />
                    <div>wotto@gmail.com</div>
                </div>
            </div>

            <div className="navtop__cta">
                <DropDownList 
                    value={props.lang}
                    list={['english', 'spanish', 'french']}
                    selectItemHandler={props.setLang}
                />
            </div>
            {/* <div className="navtop__socialMedia">
                <IconSvg icon="facebook"/>
                <IconSvg icon="instagram"/>
                <IconSvg icon="twitter"/>
            </div> */}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        lang: state.parameters.lang
    }
}

const mapDispacthToProps = dispatch => {
    return {
        setLang: lang => dispatch(actions.setLang(lang))
    }
}

export default connect(mapStateToProps, mapDispacthToProps)(navtop); 
