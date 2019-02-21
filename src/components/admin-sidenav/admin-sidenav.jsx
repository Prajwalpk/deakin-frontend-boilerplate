import React, { Component } from 'react';
import M from 'materialize-css';

class AdminSidenav extends Component {
    constructor(props) {
        super(props);

        this.initSidenav = this.initSidenav.bind(this);
    }

    componentDidMount() {
        this.initSidenav();
    }

    componentDidUpdate() {
        this.initSidenav();
    }

    initSidenav() {
        M.Sidenav.init(this.sidenav, { draggable: true });
    }

    render() {
        let style = {
            position: 'fixed',
            zIndex: 1,
            overflowX: 'hidden',
            paddingTop: 'auto',
            marginBottom: 'auto'
        }

        return (
            <div className="container left-align">
                <ul className="no-autoinit sidenav sidenav-fixed grey darken-3" style={style} ref={(sidenav) => { this.sidenav = sidenav }}>
                    <li>
                        <div className="user-view">
                            <br />
                        </div>
                    </li>
                    <li>
                        <a href="#!" className="waves-effect white-text" onClick={() => { this.props.onClick(this.props.views.DASHBOARD) }}>
                            <i className="material-icons white-text">dashboard</i>Dashboard
                        </a>
                    </li>
                    <li>
                        <a href="#!" className="waves-effect white-text" onClick={() => { this.props.onClick(this.props.views.USERS) }}>
                            <i className="material-icons white-text">person</i>Users
                        </a>
                    </li>
                    <li>
                        <a href="#!" className="waves-effect white-text" onClick={() => { this.props.onClick(this.props.views.SCORES) }}>
                            <i className="material-icons white-text">info</i>Scores
                        </a>
                    </li>
                </ul>
                {this.props.children}
            </div>
        )
    }
}

export default AdminSidenav;