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
            usersLoaded: false,
            error: false,
            errorMessage: ''
        }
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
                    usersLoaded: true,
                    error: false
                })
            } else {
                this.setState({
                    error: true,
                    errorMessage: 'An internal error occured. Please try again after some time.'
                })
            }
        })
    }

    /**
     * Delete a particular user
     */
    deleteUser(userId) {

        let deleteUserUrl = process.env.REACT_APP_LILY_API_BASE_URL + 'api/user/' + userId;
        Axios.delete(deleteUserUrl).then((result) => {

            if (result.data.statusCode === 200) {
                this.getUsers();

            } else {
                this.setState({
                    error: true,
                    errorMessage: 'An internal error occured. Please try again after some time.'
                })
            }
        })
    }

    /**
     * Render fetched users
     */
    renderUsers() {
        if (this.state.error) {
            return (
                <span className="grey-text lighten-3 darken-3"><h5>{this.state.errorMessage}</h5></span>
            )
        }

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
                                <div className="collapsible-header grey-text text-darken-3 valign-wrapper">
                                    <span className="col s12 m12 l12 left-align">{user.firstname} {user.lastname}</span>
                                    <a href="#!" onClick={() => { this.deleteUser(user.userId) }}><i className="material-icons grey-text right-align">delete</i></a>
                                </div>
                                <div className="collapsible-body grey-text text-darken-2">
                                    <span className="left"><b>Details</b></span><br /><br />
                                    <table className="left-align responsive-table">
                                        <tbody>
                                            <tr>
                                                <td width="15%">Username</td>
                                                <td>{user.firstname} {user.lastname}</td>
                                            </tr>
                                            <tr>
                                                <td>Phone No.</td>
                                                <td>{user.phone}</td>
                                            </tr>
                                            <tr>
                                                <td>Email</td>
                                                <td>{user.email}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <br /><br />
                                    {
                                        user.userRole === 'USER' ?
                                            <Link to={{ pathname: '/conversation', params: user.userId }}>
                                                <span className="grey-text text-darken-2">View Profile</span>
                                            </Link> : <div />
                                    }
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