import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Axios from 'axios';
import LoadingComponent from '../../components/loading/loading';
import M from 'materialize-css';
import Graph from '../../components/graph/graph'

import ConversationWindow from '../../components/conversation-window/conversation-window';

class Conversation extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userInfo: this.props.location.params,
            conversation: [],
            conversationList: [],
            dataLoaded: false
        }

        this.getUserConversation = this.getUserConversation.bind(this);
        this.getUserConversationList = this.getUserConversationList.bind(this);
    }

    getUserConversation(userId, conversationId) {

        let conversationUrl = process.env.REACT_APP_LILY_API_BASE_URL + 'api/user/' +
            userId + '/conversations/' + conversationId;

        Axios.get(conversationUrl).then((result) => {
            this.setState({
                conversation: result.data,
                dataLoaded: true
            })
        })
    }

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
        })

        if (this.state.dataLoaded === true) {
            console.log("Data after fetching")
            console.log(this.state.conversationList)
        }

    }

    componentDidMount() {
        M.AutoInit();

        if ((typeof this.state.userInfo) !== 'undefined') {
            this.getUserConversationList(this.state.userInfo.userId)
        }
    }

    componentDidUpdate() {
        M.AutoInit();
    }

    render() {

        const chatPanelStyle = {
            overflowY: 'scroll',
            height: '87vh'
        }

        if(typeof this.state.userInfo === 'undefined')
            return <Redirect to="/" />

        if (!this.state.dataLoaded) {
            return (<LoadingComponent loaderStyle="spinner-layer spinner-blue-only" />);
        }  {
            return (
                <div className="App">
                    <div className="" style={chatPanelStyle}>
                        <div className="row">
                            <div className="col s12 m5 l5" >
                                <ul className="collapsible">
                                    <li>
                                        <div className="collapsible-header">
                                            <i className="material-icons">info</i>
                                            <span>User Info</span>
                                        </div>
                                        <div className="collapsible-body">
                                            <span>
                                                <h6 className="grey-text text-darken-2"><b>{this.state.userInfo.firstname} {this.state.userInfo.lastname}</b></h6>
                                                <ul className="grey-text text-darken-2 left-align">
                                                    <li>Anxiety : {this.state.userInfo.anxiety}</li>
                                                    <li>Stress : {this.state.userInfo.stress}</li>
                                                    <li>Depression : {this.state.userInfo.depression}</li>
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
                                            <span>
                                                <h6 className="grey-text text-darken-2"><b>{this.state.userInfo.firstname} {this.state.userInfo.lastname}</b></h6>
                                                <ul className="grey-text text-darken-2 left-align">
                                                    <li>Anxiety : {this.state.userInfo.anxiety}</li>
                                                    <li>Stress : {this.state.userInfo.stress}</li>
                                                    <li>Depression : {this.state.userInfo.depression}</li>
                                                </ul>
                                            </span>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="collapsible-header">
                                            <i className="material-icons">pie_chart</i>
                                            <span>Results History</span>
                                        </div>
                                        <div className="collapsible-body">
                                            <span>
                                                <Graph graphData={this.state.userInfo} type="doughnut" />
                                            </span>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="collapsible-header">
                                            <i className="material-icons">show_chart</i>
                                            <span>Response Profile</span>
                                        </div>
                                        <div className="collapsible-body">
                                            <span>
                                                <Graph graphData={this.state.userInfo} type="bar" />
                                            </span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div className="col s12 m7 l7">
                                <span className="card-panel grey lighten-5 col s12 m11 l11">
                                    {
                                        this.state.conversation.map((result, i) => (
                                            <div key={i}>
                                                <ConversationWindow content={result} />
                                            </div>
                                        ))
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