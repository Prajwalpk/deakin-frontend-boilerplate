import React, { Component } from 'react';
import Axios from 'axios';

class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            emailId: '',
            password: '',
            confirmPassword: '',
            phone: '',
            passwordMismatch: false
        }
        this.handleCreate = this.handleCreate.bind(this);
        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
        this.handleLastNameChange = this.handleLastNameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePhoneChange = this.handlePhoneChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleConfirmPassword = this.handleConfirmPassword.bind(this);
        this.validateUserInput = this.validateUserInput.bind(this);
    }

    handleFirstNameChange(e) {
        this.setState({
            firstName: e.target.value
        })
    }

    handleLastNameChange(e) {
        this.setState({
            lastName: e.target.value
        })
    }

    handleEmailChange(e) {
        this.setState({
            emailId: e.target.value
        })
    }

    handlePhoneChange(e) {
        this.setState({
            phone: e.target.value
        })
    }

    handlePasswordChange(e) {
        this.setState({
            password: e.target.value
        })
    }

    handleConfirmPassword(e) {
        this.setState({
            confirmPassword: e.target.value
        })
    }

    validateUserInput() {

    }

    handleCreate() {
        if (this.state.password !== this.state.confirmPassword) {
            alert("Password mismatch!");
        } else {

            let createUserUrl = process.env.REACT_APP_LILY_API_BASE_URL + '/user';
            let user = {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                emailId: this.state.emailId,
                phone: this.state.phone,
                password: this.state.password
            }
            alert("Creating")
            Axios.post(createUserUrl, {user}).then((result )=> {
                alert(JSON.stringify(result));
            })
        }
    }

    render() {
        return (
            <div className="row">
                <div className="col s12">
                    <div className="row">
                        <div className="input-field col s12 m6 l6">
                            <input id="first_name" type="text" className="validate" onChange={this.handleFirstNameChange} />
                            <label htmlFor="first_name">First Name</label>
                        </div>
                        <div className="input-field col s12 m6 l6">
                            <input id="last_name" type="text" className="validate" onChange={this.handleLastNameChange} />
                            <label htmlFor="last_name">Last Name</label>
                        </div>
                        <div className="input-field col s12 m6 l6">
                            <input id="email" type="email" className="validate" onChange={this.handleEmailChange} />
                            <label htmlFor="email">Email ID</label>
                        </div>
                        <div className="input-field col s12 m6 l6">
                            <input id="phone" type="tel" className="validate" onChange={this.handlePhoneChange} />
                            <label htmlFor="phone">Phone Number</label>
                        </div>
                        <div className="input-field col s12 m6 l6">
                            <input id="password" type="password" className="validate" onChange={this.handlePasswordChange} />
                            <label htmlFor="password">Password</label>
                        </div>
                        <div className="input-field col s12 m6 l6">
                            <input id="confirm_password" type="password" className="validate" onChange={this.handleConfirmPassword} />
                            <label htmlFor="confirm_password">Confirm Password</label>
                        </div>
                    </div>
                    <a className="waves-effect waves-light cyan btn" id="createAccount" onClick={this.handleCreate} href="#!">
                        Create Account
                    </a>
                    <br /><br />
                    {
                        this.props.fromLogin ?
                            <a href="#!" className="grey-text" onClick={this.props.onClick}>Already registered? Click here to login!</a> : <div />
                    }
                </div>
            </div>
        )
    }
}

export default Register;