import React, { Component } from 'react';
import AppHelper from "helpers/AppHelper.js";
import { connect } from 'react-redux';
import { requestLogout } from 'actions';
import { history } from '../helpers/router';

import M from 'materialize-css';

class Header extends Component {

  logout = (e) => {
    e.preventDefault();
    this.props.dispatchLogout()
    AppHelper.logoutUser()

    this.initDropdown = this.initDropdown.bind(this);
    this.handleHomeRedirect = this.handleHomeRedirect.bind(this);
  }

  componentDidMount() {
    this.initDropdown();
  }

  componentDidUpdate() {
    this.initDropdown();
  }

  initDropdown() {
    M.Dropdown.init(this.dropdown, { constrainWidth: true, coverTrigger: false });
  }

  /**
   * Funtion to handle home button click. If admin, redirect
   * to admin page. Users are redirected to user landing page.
   * 
   * TODO: Add role based redirect using tokens.
   * @param {*} e 
   */
  handleHomeRedirect(e) {
    e.preventDefault();
    let admin = window.localStorage.getItem("admin");
    if (admin !== 'false' && admin !== null) {
      history.push("/home");
    } else {
      history.push("/userhome");
    }
  }

  render() {
    return (
      <header className="Header page-header">
        <div className="navbar-fixed ">
          <nav className="cyan accent-4">
            <div className="nav-wrapper">
              <ul className="left">
                <a href="#!" className="btn-flat btn-floating cyan accent-4 waves-effect waves-light" onClick={this.handleHomeRedirect}>
                  <i className="material-icons white-text">home</i>
                </a>
              </ul>
              <a href="#!" className="brand-logo center">{this.props.title}</a>
              <ul className="right">
              <span className="show-on-medium-and-above">{AppHelper.getUserName()}</span>
                <a className="no-autoinit btn-flat btn-floating circle cyan accent-4 waves-effect waves-light dropdown-trigger"
                  ref={(dropdown) => { this.dropdown = dropdown }} href="#!" data-target="user-menu">
                  <i className="material-icons white-text">more_vert</i>
                </a>
                <ul id="user-menu" className="dropdown-content">
                  <li><a className="cyan-text accent-4" href="#!" onClick={this.logout}>Settings</a></li>
                  <li><a className="cyan-text accent-4" href="#!" onClick={this.logout}>Logout</a></li>
                </ul>
              </ul>
            </div>
          </nav>
        </div>
      </header>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchLogout: () => dispatch(requestLogout())
  }
}

export default connect(null, mapDispatchToProps)(Header);
