import React, { Component } from 'react';
import './HomeContact.css';
import Login from '../../../pages/auth/login/Login';
import { FormattedMessage } from 'react-intl'

 class HomeContact extends Component {
    state= {
        loginForm: {
            email: {
                value: ''
            },

            password:{
                value: ''
            }
        },

        error: null,
    }

    inputChangeHandler = (input, value) => {
        this.setState( prevState => {
            const updatedForm = {
                ...prevState.loginForm,
                [input]: {
                    ...prevState.loginForm[input],
                    value: value
                }
            }

            return {
                loginForm: updatedForm
            }
        })
    }


    render() {
        return (
            <div className="home-contact">
                <h1 className="home-contact__title"><FormattedMessage id="needHelp" defaultMessage="Need soome help"/></h1>
                <p className="home-contact__text">
                    <FormattedMessage id="homeContactText" defaultMessage="Log in to your woto account and enjoy a premium service for free. Our agents will be happy to assist you in the purchase of your next car."/> 
                </p>
                <div className="home-contact__form">
                     <Login />
                </div>
                
            </div>
        )
    }
}


export default HomeContact
