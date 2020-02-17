import React, { Component } from 'react';
import './HomeContact.css';
import Login from '../../../pages/auth/login/Login';

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
                <h1 className="home-contact__title">Need some help</h1>
                <p className="home-contact__text">
                Lorem ipsum dolor sit amet. Proin non venenatis turpis. Nulla vitae odio eget justo dapibus faucibus. Maecenas semper elementum augue a ultrices. 
                </p>
                <div className="home-contact__form">
                     <Login />
                </div>
                
            </div>
        )
    }
}


export default HomeContact
