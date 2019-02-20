import React, { Component } from 'react';
import Axios from 'axios';


// Regex patterns for input validation
const alphabets = /^[a-zA-Z]+$/;
const numerals = /^[0-9]+$/;
const email = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;

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
            admin: false,
            validationError: true,
            errorMessage: ''
        }

        this.handleCreate = this.handleCreate.bind(this);
        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
        this.handleLastNameChange = this.handleLastNameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePhoneChange = this.handlePhoneChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleConfirmPassword = this.handleConfirmPassword.bind(this);
        this.handleAdmin = this.handleAdmin.bind(this);
        this.validateUserInput = this.validateUserInput.bind(this);
        this.errorMessage = this.errorMessage.bind(this);
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
            password: e.target.value,
            errorMessage: ''
        })
    }

    handleConfirmPassword(e) {
        this.setState({
            confirmPassword: e.target.value,
            errorMessage: ''
        })
    }

    handleAdmin(e) {
        this.setState({
            admin: e.target.checked
        })
    }

    validateUserInput() {
        // Empty check
        if (this.state.firstName === '' || this.state.lastName === ''
            || this.state.emailId === '' || this.state.phone === ''
            || this.state.password === '' || this.state.confirmPassword === '') {
            this.setState({
                errorMessage: 'Incomplete form. Please complete all fields',
                validationError: true
            })
            return false;
        } else if (this.state.password !== this.state.confirmPassword) {
            this.setState({
                errorMessage: 'Entered passwords do not match!',
                validationError: true
            })
            return false;
        } else if (!alphabets.test(this.state.firstName) || !alphabets.test(this.state.lastName)) {
            this.setState({
                errorMessage: 'Invalid name. Please only use alphabetical characters!',
                validationError: true
            })
            return false;
        } else if (!email.test(this.state.emailId)) {
            this.setState({
                errorMessage: 'Invalid email address!',
                validationError: true
            })
            return false;
        } else if (!numerals.test(this.state.phone)) {
            this.setState({
                errorMessage: 'Invalid phone number. Please only use numbers!',
                validationError: true
            })
            return false;
        }

        this.setState({
            validationError: false
        })

        return true;
    }

    errorMessage() {
        if (this.state.validationError) {
            return (
                <p><i><span className="red-text">{this.state.errorMessage}</span></i></p>
            )
        }
    }

    handleCreate() {
        if (!this.validateUserInput())
            return;

        let createUserUrl = process.env.REACT_APP_LILY_API_BASE_URL + 'api/user';
        let user = {
            firstname: this.state.firstName,
            lastname: this.state.lastName,
            email: this.state.emailId,
            phone: this.state.phone,
            password: this.state.password,
            userRole: this.state.admin ? 'ADMIN' : 'USER'
        }

        Axios.post(createUserUrl, user).then((result) => {
            if(result.data.statusCode) {
                if (result.data.statusCode === 201) {
                    alert("Created user");
                    this.props.onClick();
                }
            } 
        })
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
                        {
                            // Show the admin button only if the component is launched
                            // from inside the admin onboarding panel
                            !this.props.fromLogin ?
                                <div className="switch col s12 m12 l12">
                                    <label htmlFor="admin">
                                        <input id="admin" type="checkbox" onChange={this.handleAdmin} />
                                        <span>Admin</span>
                                    </label>
                                </div> : <div />
                        }
                    </div>
                    {
                        this.errorMessage()
                    }
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