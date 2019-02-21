import React, { Component } from 'react';
import AppHelper from "helpers/AppHelper.js";
import { connect } from 'react-redux';
import { requestLogin, developerModeLogin } from 'actions';
import Register from '../../components/register/register';

import Card from '../../components/card/card';
import "./login.scss";

const userInfo = {
  "statusCode": 200,
  "message": {
    "custommessage": "Found User"
  },
  "data": {
    "userRole": "ADMIN",
    "userId": "31bd5fa0-30e1-11e9-8c5c-4dec16895fdc"
  }
}

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailId: '',
      password: '',
      developerMode: false, // Change this to false to contact API
      error: false,
      errorMsg: '',
      register: false
    };

    this.handleRegister = this.handleRegister.bind(this);
  }

  errorMessage = () => {
    if (this.state.error) {
      return (
        <p><b>{this.state.errorMsg}</b></p>
      )
    }
  }

  handleEmailChange = (e) => {
    this.setState({
      emailId: e.target.value,
      errorMsg: ''
    });
  }

  handlePasswordChange = (e) => {
    this.setState({
      password: e.target.value,
      errorMsg: ''
    });
  }

  validationCheck = () => {
    let email = this.state.emailId
    let password = this.state.password
    if ((email.length > 0) && (password.length > 0)) {
      return true
    } else {
      this.setState({
        error: true,
        errorMsg: "Email or password must not be empty!"
      })
      return false
    }
  }

  performLogin = (e) => {
    e.preventDefault();
    if (this.state.developerMode) {
      console.log('inside developerMode login');

      if (userInfo && userInfo.statusCode === 200) {
        const userId = userInfo.data.userId;
        const userRole = userInfo.data.userRole;
        this.props.dispatchDeveloperModeLogin();
        AppHelper.basicLoginUser(true, 'Developer', userRole, userId);

      } else {
        this.setState({
          error: true,
          errorMsg: "Invalid email or password!"
        })
      }

      return;
    }

    console.log('outside developerMode login');
    if (!this.validationCheck()) return;
    this.props.dispatchLogin(this.state).then((response) => {
      /*if (
        response && response.payload && response.payload.data &&
        response.payload.data.data && response.payload.data.data.accessToken
      ) {
        const accessToken = response.payload.data.data.accessToken;
        AppHelper.loginUser(true, accessToken);
      } */
      // Add token based auth. later - use basic auth now.
      console.log(response)

      if (response && response.payload && response.payload.data &&
        response.payload.data.statusCode === 200 &&
        response.payload.data.data && response.payload.data.data.userId) {

        console.log("In Login")
        const userId = response.payload.data.data.userId;
        const userRole = response.payload.data.data.userRole;
        const name = response.payload.data.data.name;
        AppHelper.basicLoginUser(true, name, userRole, userId);

      } else {
        this.setState({
          error: true,
          errorMsg: "Invalid credentials!"
        })
      }
    });
  }

  handleRegister() {
    this.setState({ register: !this.state.register })
  }

  render() {

    let cardStyle = {
      borderRadius: "10px",
      opacity: 0.9,
      backgroundColor: "rgba(250, 250, 250, 0.9)",
      margin: "auto",
      paddingLeft: "2%",
      paddingRight: "2%"
    }

    if (this.state.register) {
      return (
        <div className="Login">
          <h1>
            {this.props.parentState.title}
          </h1>
          <div className="container">
            <div className="row valign-wrapper">
              <div className="col s0 m4 l2"></div>
              <Card cardStyle={cardStyle} cardClass="col s12 m10 l8">
                <br />
                <Register onClick={this.handleRegister} fromLogin={true} />
              </Card>
              <div className="col s0 m4 l2"></div>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div className="Login">
          <h1>
            {this.props.parentState.title}
          </h1>
          <div className="container">
            <div className="row valign-wrapper">
              <div className="col s0 m4 l2"></div>
              <Card cardStyle={cardStyle} cardClass="col s12 m10 l8">
                <div className='row'>
                  <div className='col s12 m12 l12'>
                    <br />
                    <input placeholder="Email" id="email" type="email" className="validate" onChange={this.handleEmailChange} />
                    <input placeholder="Password" id="password" type="password" className="validate" onChange={this.handlePasswordChange} />
                    <br /><br /><br />
                    {this.errorMessage()}
                    {
                      this.props.loginLoading ?
                        "Loading..." :
                        <a className="waves-effect waves-light cyan btn" id="loginButton" onClick={this.performLogin} href="#!">
                          Login
                        </a>
                    }
                    <br /><br />
                    <a href="#!" onClick={this.handleRegister} className="grey-text">Don't have an account? Click here to register!</a>
                  </div>
                </div>
              </Card>
              <div className="col s0 m4 l2"></div>
            </div>
          </div>
        </div>
      );
    }
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchLogin: (data) => dispatch(requestLogin(data)),
    dispatchDeveloperModeLogin: () => dispatch(developerModeLogin())
  }
}

const mapStateToProps = (state) => {
  return {
    loginLoading: state.loginStatus.loginLoading
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
