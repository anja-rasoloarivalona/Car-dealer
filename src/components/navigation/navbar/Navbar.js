import React, { Component } from 'react'
import './Navbar.css';
import Button from '../../button/Button';
import { connect } from 'react-redux';
import IconSvg from '../../../utilities/svg/svg';
import { NavLink} from 'react-router-dom'

class Navbar extends Component {

    state = {
        showSelector: false,
        isAuth: null
    }

    componentDidMount(){
        this.setState({ isAuth: this.props.isAuth})
    }

    componentDidUpdate(prevProps){
        if(prevProps.isAuth !== this.state.isAuth){
            this.setState({ isAuth: this.props.isAuth})
        }
    }

    componentWillMount(){
        document.addEventListener('mousedown', this.handleClick, false)
    }
    
    componentWillUnmount(){
         document.removeEventListener('mousedown', this.handleClick, false)
    }

    logoutHandler = () => {
        this.setState({ isAuth: false}, () => this.props.logoutHandler() )
    }

    handleClick = e => {         
        if(this.target && this.target.contains(e.target)){
            return
        } else {
            if(this.state.showSelector){
                this.toggleSelector()
            }
            
        }     
    }



    showSelector = () => {
        this.setState({ showSelector : true})
    }

    toggleSelector = () => {
        this.setState(prevState => ({
            ...prevState,
            showSelector: !prevState.showSelector
        }))
    }

    render() {
        let userName = this.props.userName;
        const { showSelector , isAuth } = this.state


        let firstName, lastName
        if(isAuth){
             firstName = userName.split(' ')[0]
             lastName = userName.split(' ')[1]
        }
       

    
        return (
            <nav className={`navbarContainer`}>
            <ul className="navbar__list">
                <NavLink to="/" exact className="navbar__list__item">
                    Home
                                    </NavLink>
                <NavLink to="/inventory" className="navbar__list__item">
                    Inventory
                                    </NavLink>
                <NavLink to="/services" className="navbar__list__item">
                    Services
                </NavLink>
            </ul>

            <div className="navbar__cta">
                {!isAuth && (
                        <a className="navbar__cta__login" href="/auth">
                            <IconSvg icon="user"/>
                            <span>Login</span>
                        </a>
                )}

                {isAuth && (
                    <div className="navbar__cta__avatar"
                         onClick={this.toggleSelector}
                    >
                       <span>{firstName.slice(0, 1)}{lastName.slice(0, 1)}</span> 

                       <div className={`navbar__cta__avatar__selector ${showSelector ? 'show': ''}`}
                             ref={el => this.target = el}
                       >
                            <div className="navbar__cta__avatar__selector__item">
                                My account
                            </div>
                            <div className="navbar__cta__avatar__selector__item"
                                 onClick={this.logoutHandler}
                            >
                                Logout
                            </div>
                       </div>


                    </div>

                )}
            </div>
        </nav>
        )
    }
}



const mapStateToProps = state => {
    return {
        isAuth: state.auth.auth,
        userName: state.auth.userName
    }
}
export default connect(mapStateToProps)(Navbar);
