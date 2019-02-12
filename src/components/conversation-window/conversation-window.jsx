import React, { Component } from 'react';

class ConversationWindow extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        let botBubble = {

        }

        let userBubble = {

        }

        return (
            <div className="container right-align">
                <div className="row">
                    <div className="col s12 m9 right-align">
                        <span className="left-align"><h6>{this.props.content.BOT}</h6></span>
                        <span className="right-align"><h6>{this.props.content.USER}</h6></span>
                    </div>
                </div>
            </div>

        )
    }
}

export default ConversationWindow;