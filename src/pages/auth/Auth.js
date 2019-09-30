import React, { Component } from 'react'
import './Auth.css';

import Login from './login/Login';
import Signup from './signup/Signup';



class Auth extends Component {

    state= {
        requestSignupForm: false,
        requestLoginForm: false

    }

    requestLoginFormHandler = () => {
        this.setState({ requestLoginForm: true , requestSignupForm: false})
    }

    requestSignupFormHandler = () => {
        this.setState({ requestSignupForm: true, requestLoginForm: false})
    }



    render() {
        return (
            <section className="auth">

                    <div className="auth__container">
                        <Login requestSignupForm={this.state.requestSignupForm} 
                                requestSignupFormHandler={this.requestSignupFormHandler}
                                />
                        <Signup requestLoginForm={this.state.requestLoginForm}
                                requestLoginFormHandler={this.requestLoginFormHandler}/>
                    </div>
                
            </section>
        )
    }
}



export default Auth;
