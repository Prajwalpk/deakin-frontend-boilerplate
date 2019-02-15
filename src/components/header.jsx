import React, { Component } from 'react';
import AppHelper from "helpers/AppHelper.js";
import { connect } from 'react-redux';
import { requestLogout } from 'actions';

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

  handleHomeRedirect(e) {
    e.preventDefault();
    let admin = window.localStorage.getItem("admin");
    if(admin !== 'false' && admin !== null)
      window.location.replace("/home");
    else
      window.location.replace("/userhome");
  }

  render() {
    return (
      <header className="Header page-header">
        <div className="navbar-fixed ">
          <nav className="light-blue accent-2">
            <div className="nav-wrapper">
              <a href="#" className="left btn-flat btn-floating light-blue accent-2 waves-effect waves-light" onClick={this.handleHomeRedirect}>
                <i className="material-icons white-text">home</i>
              </a>
              <a href="#!" className="brand-logo center">{this.props.title}</a>
              <ul className="right">
                <a className="no-autoinit btn-flat btn-floating circle light-blue accent-2 waves-effect waves-light dropdown-trigger"
                  ref={(dropdown) => { this.dropdown = dropdown }} href="#!" data-target="user-menu">
                  <i className="material-icons white-text">more_vert</i>
                </a>
                <ul id="user-menu" className="dropdown-content">
                  <li><a className="light-blue-text accent-2" href="#!" onClick={this.logout}>Settings</a></li>
                  <li><a className="light-blue-text accent-2" href="#!" onClick={this.logout}>Logout</a></li>
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
