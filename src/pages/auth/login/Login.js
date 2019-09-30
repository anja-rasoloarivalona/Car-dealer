import React, { Component } from 'react';
import Input from '../../../components/formInput/FormInput';
import Button from '../../../components/button/Button';
import './Login.css';


 class Login extends Component {

    state= {
        loginForm: {
            email: {
                value: ''
            },

            password:{
                value: ''
            }
        },


        
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
           
            <form className= {`auth__form auth__form--login ${this.props.requestSignupForm ? '': 'show'}`} >
                <h1 className="auth__title">Login</h1>

                <ul className="auth__input__list">

                            <Input  type='email'
                                control='input'
                                label='email'
                                id='email'
                                value={this.state.loginForm['email'].value}
                                onChange={this.inputChangeHandler}
                                placeholder='email'
                                border
                                required={true}/>

                        <Input  type='password'
                                control='input'
                                label='mot de passe'
                                id='password'
                                value={this.state.loginForm['password'].value}
                                onChange={this.inputChangeHandler}
                                placeholder='mot de passe'
                                border
                                required={true}/>
                </ul>

                <div className='login__options'>
                    <div className="login__options--1" >
                        Mot de passe oublié
                    </div>
                    <div className="login__options--1" onClick={this.props.requestSignupFormHandler}>
                        Pas encore membre ?
                    </div>
                </div>

                <div className="auth__button">
                    <Button color='primary' type='submit'>
                        Login
                    </Button>
                </div>
                
            </form>
        )   
    }
}

export default Login;
