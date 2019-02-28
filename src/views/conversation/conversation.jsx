import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Axios from 'axios';
import LoadingComponent from '../../components/loading/loading';
import M from 'materialize-css';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

import ConversationWindow from '../../components/conversation-window/conversation-window';


class Conversation extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userId: this.props.location.params,
            userInfo: [],
            conversation: [],
            conversationList: [],
            scoresList: [],
            responseProfileData: [],
            dataLoaded: false
        }
    }

    /**
     * Get user information
     * 
     * @param {*} userId 
     */
    getUserInfo(userId) {
        let userUrl = process.env.REACT_APP_LILY_API_BASE_URL + 'api/user/' + userId;

        Axios.get(userUrl).then((result) => {
            if (result.data.statusCode === 200) {
                this.setState({
                    userInfo: result.data.data,
                    dataLoaded: true
                })
            }
        }).catch((err) => {

        })
    }

    /**
     * Get list of recorded scores for all completed tests
     * 
     * @param {*} userId 
     */
    getScoresList(userId) {
        let scoresUrl = process.env.REACT_APP_LILY_API_BASE_URL + 'api/user/' +
            userId + '/scores';

        Axios.get(scoresUrl).then((result) => {
            if (result.data.statusCode === 200) {
                this.setState({
                    scoresList: result.data.data
                })
            }
        }).catch((err) => {

        })
    }

    generateUserResponseProfile() {
        let data = []
        let qNumber = 1;
        for (let i = 0; i < this.state.conversation.length - 1; i++) {

            if (this.state.conversation[i].BOT.includes("Question ")) {
                let userResponse = Object.assign({}, { name: '', responseTime: 0 })
                let deltaTime = Math.abs(new Date(this.state.conversation[i + 1].userQueryTime)
                    - new Date(this.state.conversation[i].queryResponseTime));

                userResponse.name = "Question " + qNumber++;
                userResponse.responseTime = Math.floor(deltaTime / 1000);

                data.push(userResponse);
            }
        }

        this.setState({
            responseProfileData: data
        })
    }

    /**
     * Get a single conversation
     * 
     * @param {*} userId 
     * @param {*} conversationId 
     */
    getUserConversation(userId, conversationId) {

        let conversationUrl = process.env.REACT_APP_LILY_API_BASE_URL + 'api/user/' +
            userId + '/conversations/' + conversationId;

        Axios.get(conversationUrl).then((result) => {
            this.setState({
                conversation: result.data.data,
                dataLoaded: true
            })

            this.generateUserResponseProfile();
        }).catch((err) => {

        })
    }

    /**
     * Get a list of conversations for a user
     * 
     * @param {*} userId 
     */
    getUserConversationList(userId) {

        let conversationUrl = process.env.REACT_APP_LILY_API_BASE_URL +
            'api/user/' + userId + '/conversations';

        Axios.get(conversationUrl).then((result) => {
            if (result.data.statusCode === 200) {
                this.setState({
                    conversationList: result.data.data.conversations,
                    dataLoaded: true
                })
            }
        }).catch((err) => {

        })
    }

    // Format the stored timestamp for stored conversations
    formatConversationTime(timestamp) {
        var date = new Date(timestamp).toLocaleDateString('en-au', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });

        return date;
    }

    renderScoresList() {
        if (!this.state.scoresList.length > 0) {
            return (
                <span className="grey-text text-darken-1">No Test Scores Available</span>
            )
        } else {
            return (
                <ol className="grey-text text-darken-1 left-align">
                    {
                        this.state.scoresList.map((result, i) => (
                            <li key={i}>
                                <a className="btn-flat grey-text text-darken-1" href="#!"
                                    onClick={() => this.getUserConversation(this.state.userId, result.conversationId)}>
                                    Anxiety: {result.anxiety} | Stress: {result.stress} | Depression: {result.depression}
                                </a>
                            </li>
                        ))
                    }
                </ol>
            )
        }
    }

    renderConversationList() {
        if (!this.state.conversationList.length > 0) {
            return (
                <span className="grey-text text-darken-1">No Conversations Available</span>
            )
        } else {
            return (
                <ol className="grey-text text-darken-1 left-align">
                    {
                        this.state.conversationList.map((result, i) => (
                            <li key={i}>
                                <a className="btn-flat grey-text text-darken-1" href="#!"
                                    onClick={() => this.getUserConversation(this.state.userId, result.conversationId)}>
                                    {this.formatConversationTime(result.conversationTimestamp)}
                                </a>
                            </li>
                        ))
                    }
                </ol>
            )
        }
    }

    renderUserInfoPanel() {
        return (
            <ul className="collapsible">
                <li>
                    <div className="collapsible-header">
                        <i className="material-icons">info</i>
                        <span>User Info</span>
                    </div>
                    <div className="collapsible-body">
                        <span>
                            <h6 className="grey-text text-darken-2"><b>{this.state.userInfo.firstname} {this.state.userInfo.lastname}</b></h6>
                            <ul className="grey-text text-darken-2 left-align">Latest DASS Score -</ul>
                            <ul className="grey-text text-darken-2 left-align">
                                <li>Anxiety : {this.state.scoresList.length > 0 ? this.state.scoresList[this.state.scoresList.length - 1].anxiety : 'N/A'}</li>
                                <li>Stress : {this.state.scoresList.length > 0 ? this.state.scoresList[this.state.scoresList.length - 1].stress : 'N/A'}</li>
                                <li>Depression : {this.state.scoresList.length > 0 ? this.state.scoresList[this.state.scoresList.length - 1].depression : 'N/A'}</li>
                            </ul>
                        </span>
                    </div>
                </li>
                <li>
                    <div className="collapsible-header">
                        <i className="material-icons">chat_bubble</i>
                        <span>Conversations</span>
                    </div>
                    <div className="collapsible-body">
                        {
                            this.renderConversationList()
                        }
                    </div>
                </li>
                <li>
                    <div className="collapsible-header">
                        <i className="material-icons">history</i>
                        <span>DASS Results History</span>
                    </div>
                    <div className="collapsible-body">
                        {
                            this.renderScoresList()
                        }
                    </div>
                </li>
            </ul>
        )
    }

    renderUserResponseProfile() {
        return (
            <div className="">
                <br />
                <LineChart
                    width={700}
                    height={400}
                    data={this.state.responseProfileData}
                    margin={{
                        top: 5, right: 30, left: 20, bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line legendType="star" type="monotone" dataKey="responseTime" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
            </div>
        )
    }

    componentDidMount() {
        M.AutoInit();

        if ((typeof this.state.userId) !== 'undefined') {
            this.getUserInfo(this.state.userId)
            this.getScoresList(this.state.userId)
            this.getUserConversationList(this.state.userId)
        }
    }

    componentDidUpdate() {
        M.AutoInit();
    }

    render() {

        const chatPanelStyle = {
            //overflowY: 'scroll',
            //height: '87vh'
        }

        const sidePanelStyle = {
            //height: '40vh',
            //zIndex: '1'
        }

        if (typeof this.state.userId === 'undefined')
            return <Redirect to="/" />

        if (typeof this.state.userId === 'undefined') {
            return (<LoadingComponent loaderStyle="spinner-layer spinner-blue-only" />);
        } else {
            return (
                <div className="App">
                    <div className="" >
                        <div className="row">
                            <div className="col s12 m5 l5" >
                                <div style={sidePanelStyle}>
                                    <div className="left-align">
                                        <h5 className="grey-text text-darken-4">User Options</h5>
                                    </div>
                                    {
                                        this.renderUserInfoPanel()
                                    }
                                </div><br />
                                <div className="left-align s12" style={sidePanelStyle}>
                                    <h5 className="grey-text text-darken-4">Response Profile</h5>
                                    {
                                        this.renderUserResponseProfile()
                                    }
                                </div>
                            </div>
                            <div className="col s12 m7 l7 left-align">
                                <h5 className="grey-text text-darken-4">Chat History</h5>
                            </div>
                            <div className="col s12 m7 l7" style={chatPanelStyle}>
                                <span className="grey lighten-5 col s12 m11 l11">
                                    {
                                        this.state.conversation.length > 0 ?
                                            this.state.conversation.map((result, i) => (
                                                <div key={i}>
                                                    <ConversationWindow content={result} />
                                                </div>
                                            ))
                                            : <h6 className="grey-text text-darken-3">No Conversation Selected</h6>
                                    }
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default Conversation;