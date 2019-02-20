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
            dataLoaded: false
        }

        this.getUserConversation = this.getUserConversation.bind(this);
    }

    getUserConversation(userId) {

        let conversationUrl = process.env.REACT_APP_LILY_API_BASE_URL + 'api/userConversation/' + userId;
        Axios.get(conversationUrl).then((result) => {
            this.setState({
                conversation: result.data,
                dataLoaded: true
            })
        })
    }

    componentDidMount() {
        M.AutoInit();

        if ((typeof this.state.userInfo) !== 'undefined')
            this.getUserConversation(this.state.userInfo.userId)
    }

    componentDidUpdate() {
        M.AutoInit();
    }

    render() {
        const chatPanelStyle = {
            overflowY: 'scroll',
            height: '87vh'
        }

        if ((typeof this.state.userInfo) === 'undefined') {
            return <Redirect to="/" />
        }

        if (!this.state.dataLoaded) {
            return (<LoadingComponent loaderStyle="spinner-layer spinner-blue-only" />);
        } else {
            return (
                <div>
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
                                                <h6 className="grey-text darken-3 lighten-2">{this.state.userInfo.userId}</h6>
                                                <ul className="grey-text darken-3 lighten-2 left-align">
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
                                            <span>Results</span>
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
                                {/*<span className="card-panel show-on-medium-and-up">
                                    <h6 className="grey-text darken-3 lighten-2">{this.state.userInfo.UserID}</h6>
                                    <ul className="grey-text darken-3 lighten-2 left-align">
                                        <li>Anxiety : {this.state.userInfo.Anxiety}</li>
                                        <li>Stress : {this.state.userInfo.Stress}</li>
                                        <li>Depression : {this.state.userInfo.Depression}</li>
                                    </ul>
                                </span>*/}
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