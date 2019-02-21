import React, { Component } from 'react';
import Axios from 'axios';
import M from 'materialize-css';
import LoadingComponent from '../loading/loading';
import Register from '../register/register';
import { Link } from 'react-router-dom';

class Users extends Component {
    constructor(props) {
        super(props)
        this.state = {
            users: [],
            usersLoaded: false
        }

        this.getUsers = this.getUsers.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        this.renderUsers = this.renderUsers.bind(this);
    }

    /**
     * Fetch all registered users
     */
    getUsers() {
        let getAllUserUrl = process.env.REACT_APP_LILY_API_BASE_URL + 'api/user';
        Axios.get(getAllUserUrl).then((result) => {

            if (result.data.statusCode === 200) {
                this.setState({
                    users: result.data.data,
                    usersLoaded: true
                })
            } else {
                return (
                    <div><h6>Server Error</h6></div>
                )
            }
        })
    }

    /**
     * Delete a particular user
     */
    deleteUser(userId) {

        let deleteUserUrl = process.env.REACT_APP_LILY_API_BASE_URL + 'api/user/' + userId;
        Axios.delete(deleteUserUrl).then((result) => {

            if (result.data.statusCode == 200) {
                this.getUsers();

            } else {
                return (
                    <div><h6>Server Error</h6></div>
                )
            }
        })
    }

    /**
     * Render fetched users
     */
    renderUsers() {
        if (!this.state.usersLoaded) {
            return (
                <div className="Home">
                    <div className="container">
                        <LoadingComponent loaderStyle="spinner-layer spinner-blue-only" />
                    </div>
                </div>
            )
        } else {
            return (
                <ul className="collapsible popout">
                    {
                        this.state.users.map((user, i) => (
                            <li key={i}>
                                <div className="collapsible-header black-text valign-wrapper">
                                    <span className="col s12 m12 l12 left-align">{user.firstname} {user.lastname}</span>
                                    <a href="#!" onClick={() => { this.deleteUser(user.userId) }}><i className="material-icons grey-text right-align">delete</i></a>
                                </div>
                                <div className="collapsible-body black-text">
                                    {user.firstname} {user.lastname} {user.phone} {user.email}
                                </div>
                            </li>
                        ))
                    }
                </ul>
            )
        }
    }

    componentDidMount() {
        this.getUsers()
        M.AutoInit();
    }

    componentDidUpdate() {
        M.AutoInit();
    }

    render() {
        var padding = {
            marginLeft: '5%',
            marginRight: '5%'
        }
        return (
            <div className="" style={padding}>
                <div id="enroll" className="modal grey-text">
                <div className="modal-content">
                    <Register fromLogin={false} onClick={this.getUsers} />
                </div>
                </div>
                <span className="col s12 m12 l12">
                    <h4 className="grey-text text-darken-3 lighten-3 left-align">
                        Users
                        <a className="btn modal-trigger btn-floating waves-effect waves-light cyan accent-4 right" href="#enroll">
                            <i className="material-icons">add</i>
                        </a>
                    </h4>
                    <br />
                    {
                        this.renderUsers()
                    }
                </span>
            </div>
        )
    }
}

export default Users;