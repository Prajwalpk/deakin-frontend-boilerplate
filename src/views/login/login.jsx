import React, { Component } from 'react';
import AppHelper from "helpers/AppHelper.js";
import { connect } from 'react-redux';
import { requestLogin, developerModeLogin } from 'actions';

import Card from '../../components/card/card';
import "./login.scss";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailId: '',
      password: '',
      developerMode: true, // Change this to false to contact API
      error: false,
      errorMsg: ''
    };
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
      emailId: e.target.value
    });
  }

  handlePasswordChange = (e) => {
    this.setState({
      password: e.target.value
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
      this.props.dispatchDeveloperModeLogin();
      AppHelper.developerModeLoginUser(true);
      return;
    }
    console.log('outside developerMode login');
    if (!this.validationCheck()) return;
    this.props.dispatchLogin(this.state).then((response) => {
      if (
        response && response.payload && response.payload.data &&
        response.payload.data.data && response.payload.data.data.accessToken
      ) {
        const accessToken = response.payload.data.data.accessToken;
        AppHelper.loginUser(true, accessToken);
      } else {
        this.setState({
          error: true,
          errorMsg: "Invalid credentials!"
        })
      }
    });
  }

  render() {

    let cardStyle = {
      width: "30%",
      height: "30%",
      borderRadius: "10px",
      opacity: 0.9,
      backgroundColor: "rgba(250, 250, 250, 0.9)",
      margin: "auto",
      paddingLeft: "2%",
      paddingRight: "2%"
    }

    return (

      <div className="Login">
        <h1>
          {this.props.parentState.title}
        </h1>
        <Card cardStyle={cardStyle}>
          <div className='row'>
            <div className='row'>
              <br />
              <input placeholder="Email" id="email" type="email" className="validate" onChange={this.handleEmailChange} />
              <input placeholder="Password" id="password" type="password" className="validate" onChange={this.handlePasswordChange} />
              <br /><br />
              {this.errorMessage()}
              {
                this.props.loginLoading ?
                  "Loading..." :
                  <a className="waves-effect waves-light cyan btn" id="loginButton" onClick={this.performLogin} href="#!">
                    <i className="material-icons left">cloud</i>Login
                  </a>
              }
            </div>
          </div>
        </Card>
      </div>
    );
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
