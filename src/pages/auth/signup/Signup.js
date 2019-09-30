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

            userEmail: {
                value: ''
            },

            userPassword:{
                value: ''
            }
        },

        error: null

        
    }

    componentWillMount(){
        console.log(this.state)
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

    submitHandler = (e, signupFormData) => {
        
        console.log('data', signupFormData);


        e.preventDefault();

        const formData = new FormData();


        formData.append('firstName', signupFormData.firstName.value);
        formData.append('lastName', signupFormData.lastName.value);
        formData.append('email', signupFormData.userEmail.value);
        formData.append('password', signupFormData.userPassword.value)

        fetch('http://localhost:8000/auth/signup', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Object.fromEntries(formData))
        })
        .then( res => {
            if(res.status === 422){
                throw new Error (
                    "Make sure the email isn't used yet"
                )
            }

            if(res.status !== 200 && res.status !== 201){
                throw new Error ( ' Creating a user failed')
            }

            return res.json()
        })
        .then(resData => {
            console.log(resData)
            this.props.requestLoginFormHandler()
        })
        .catch( err => {
            let error = []
            error.push(err.message)
            this.setState({
                error: error
            })
        })

    }

    

    render() {
        return (
            <form className= {`auth__form auth__form--signup ${this.props.requestLoginForm ? 'hide': ''}`}
                  onSubmit={e => this.submitHandler(e, this.state.signupForm)} 
                  autoComplete="off">
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
                                id='userEmail'
                                value={this.state.signupForm['userEmail'].value}
                                onChange={this.inputChangeHandler}
                                placeholder='email'
                                border
                                required={true}/>

                        <Input  type='password'
                                control='input'
                                label='mot de passe'
                                id='userPassword'
                                value={this.state.signupForm['userPassword'].value}
                                onChange={this.inputChangeHandler}
                                placeholder='mot de passe'
                                border
                                autoComplete = 'new-password'
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
