/**
 * @author: bephilip
 */
import React, { Component } from "react";
import PropTypes from 'prop-types';
import ChatBot from "react-simple-chatbot";
import SocketIOClient from 'socket.io-client';

import AppHelper from "../../helpers/AppHelper.js";
import botLogo from "../../images/lilybot.png";

const Socket = SocketIOClient(process.env.REACT_APP_LILY_API_BASE_URL);

/**
 * Backend interface for Lily
 */
class LilyDialogInterface extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            lilyResponse: ''
        };
        this.socket = SocketIOClient(process.env.REACT_APP_LILY_API_BASE_URL);
    }

    componentDidMount() {

        const { previousStep } = this.props;

        var messageObject = {
            userId: AppHelper.getUserId(),
            conversationId: window.localStorage.getItem("conversationId"),
            message: previousStep.message
        }

        this.socket.emit('lilybot', messageObject);
        this.socket.on('lilybot', (result) => {

            this.setState({
                lilyResponse: result,

            }, () => {
                // Trigger the next step based on DialogFlow input
                if (result.includes("Question ")) {
                    this.props.triggerNextStep({ value: result, trigger: "userOptions" });
                } else {
                    this.props.triggerNextStep({ value: result, trigger: "userAnswer" });
                }
            });
        });
    }

    render() {

        return (
            <div>{this.state.lilyResponse}</div>
        )
    }
}

LilyDialogInterface.propTypes = {
    step: PropTypes.object,
    steps: PropTypes.object,
    triggerNextStep: PropTypes.func
};

LilyDialogInterface.defaultProps = {
    step: undefined,
    steps: undefined,
    triggerNextStep: undefined
};

/**
 * Chatbot interface
 */
class Chat extends Component {

    componentDidMount() {
        let newConnection = {
            userId: AppHelper.getUserId()
        }

        Socket.emit('register', newConnection)
        Socket.on('register', (message) => {
            window.localStorage.setItem("conversationId", message);
        })
    }

    render() {
        return (
            <ChatBot
                headerTitle="Lily Bot"
                floating={true}
                botAvatar={botLogo}
                userDelay={200}
                placeholder="Your message..."
                steps={[
                    {
                        id: "welcome",
                        message: "Hi! I'm Lily, the friendly bot :)",
                        trigger: "userAnswer",
                    },
                    {
                        id: "lilyQuestion",
                        component: <LilyDialogInterface />,
                        asMessage: true,
                        trigger: "userAnswer"
                    },
                    {
                        id: "userAnswer",
                        user: true,
                        trigger: "lilyQuestion"
                    },
                    {
                        id: "userOptions",
                        hideInput: true,
                        options: [
                            { value: "Always", label: "Always", trigger: "lilyQuestion" },
                            { value: "Often", label: "Often", trigger: "lilyQuestion" },
                            { value: "Sometimes", label: "Sometimes", trigger: "lilyQuestion" },
                            { value: "Never", label: "Never", trigger: "lilyQuestion" }
                        ]
                    }
                ]}
            />
        );
    }
}

export default Chat;