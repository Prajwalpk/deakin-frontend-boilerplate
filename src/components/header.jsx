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

  render() {
    return (
      <header className="light-blue lighten-2">
        <div className="navbar-fixed light-blue lighten-2">
          <nav>
            <div className="nav-wrapper">
              <a href="#!" className="brand-logo center">{this.props.title}</a>
              <ul className="right">
                <a className="btn-flat btn-floating circle waves-effect waves-light dropdown-trigger"
                  ref={(dropdown) => { this.dropdown = dropdown }} href="#!" data-target="user-menu">
                  <i className="material-icons white-text">more_vert</i>
                </a>
                <ul id="user-menu" className="dropdown-content">
                  <li><a href="#!" onClick={this.logout}>Settings</a></li>
                  <li><a href="#!" onClick={this.logout}>Logout</a></li>
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
