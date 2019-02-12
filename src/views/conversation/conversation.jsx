import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Axios from 'axios';
import LoadingComponent from '../../components/loading/loading';

import ConversationWindow from '../../components/conversation-window/conversation-window';

class Conversation extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userId: this.props.location.params,
            conversation: [],
            dataLoaded: false
        }

        this.getUserConversation = this.getUserConversation.bind(this);
    }

    getUserConversation(userId) {

        let conversationUrl = 'http://localhost:8003/userConversation/' + userId;
        Axios.get(conversationUrl).then((result) => {
            this.setState({
                conversation: result.data,
                dataLoaded: true
            })
        })
    }

    componentDidMount() {
        if ((typeof this.state.userId) !== 'undefined')
            this.getUserConversation(this.state.userId)
    }

    render() {
        if ((typeof this.state.userId) === 'undefined')
            return <Redirect to="/"></Redirect>

        if (!this.state.dataLoaded) {
            return (<LoadingComponent loaderStyle="spinner-layer spinner-teal-only" />);
        } else {
            return (
                <div>
                    {
                        this.state.conversation.map((result, i) => (
                            <div keys={i}>
                               <ConversationWindow content={result}/>
                            </div>
                        ))
                    }
                </div>

            )
        }
    }
}

export default Conversation;