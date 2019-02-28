import React, { Component } from 'react';
import Card from '../card/card';

class ConversationWindow extends Component {

    render() {
        let botBubble = {
            borderRadius: "10px",
            backgroundColor: "rgba(158, 158, 158, 1.0)",
            color: "white",
            margin: "auto",
            paddingLeft: "2%",
            paddingRight: "2%",
            paddingTop: "1%",
            paddingBottom: "1%",
            display: 'flex',
            flexGrow: 1
        }

        let userBubble = {
            borderRadius: "10px",
            backgroundColor: "rgba(129, 212, 250, 1.0)",
            margin: "auto",
            paddingLeft: "2%",
            paddingRight: "2%",
            paddingTop: "1%",
            paddingBottom: "1%",
            display: 'flex',
            flexGrow: 1
        }

        return (
            <div>
                <br />
                <span className="col s6 m6 l6" />
                <span className="right-align">
                    <Card cardStyle={userBubble}>
                        <h6>{this.props.content.USER}</h6>
                    </Card>
                </span><br />
                <span className="left-align">
                    <Card cardStyle={botBubble}>
                        <h6>{this.props.content.BOT}</h6>
                    </Card>
                </span><br />
            </div>
        )
    }
}

export default ConversationWindow;