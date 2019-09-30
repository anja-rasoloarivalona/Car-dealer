import React, { Component } from 'react';
import Input from '../../../components/formInput/FormInput';
import Button from '../../../components/button/Button';
import './Signup.css';

class Signup extends Component {

    state = {
        signupForm: {
            firstName: {
                value: '',
            },
            lastName: {
                value: ''
            },

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
                ...prevState.signupForm,
                [input]: {
                    ...prevState.signupForm[input],
                    value: value
                }
            }

            return {
                signupForm: updatedForm
            }
        })
    }

    

    render() {
        return (
            <form className= {`auth__form auth__form--signup ${this.props.requestLoginForm ? 'hide': ''}`} >
                <h1 className="auth__title">Signup</h1>

                <ul className="auth__input__list">


                        <Input type='text'
                                control='input'
                               id='firstName'
                               value={this.state.signupForm['firstName'].value}
                               label='prénom'
                               onChange={this.inputChangeHandler}
                               placeholder='prénom'
                               border
                               required={true}/>
                        
                        <Input  type='text'
                                control='input'
                                label='nom'
                                id='lastName'
                                value={this.state.signupForm['lastName'].value}
                                onChange={this.inputChangeHandler}
                                placeholder='nom'
                                border
                                required={true}/>


                            <Input  type='email'
                                control='input'
                                label='email'
                                id='email'
                                value={this.state.signupForm['email'].value}
                                onChange={this.inputChangeHandler}
                                placeholder='email'
                                border
                                required={true}/>

                        <Input  type='password'
                                control='input'
                                label='mot de passe'
                                id='password'
                                value={this.state.signupForm['password'].value}
                                onChange={this.inputChangeHandler}
                                placeholder='mot de passe'
                                border
                                required={true}/>
                </ul>

                <div className='signup__options'>
                    <div className="signup__options--1" onClick={this.props.requestLoginFormHandler}>
                        Déjà un compte ?
                    </div>
                </div>

                <div className="auth__button">
                    <Button color='primary' type='submit'>
                        Sign up
                    </Button>
                </div>
                
            </form>
        )
    }
}

export default Signup;
