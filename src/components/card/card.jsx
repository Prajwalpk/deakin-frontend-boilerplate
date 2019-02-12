import React, { Component } from 'react';
import M from 'materialize-css'

class Card extends Component {
    componentDidUpdate(){
        M.AutoInit();
    }
    componentDidMount(){
        M.AutoInit();
    }

    render() {
        return (
            <div className={this.props.cardClass}
                style={this.props.cardStyle}
                onClick={this.props.onClick}>
                {this.props.children}
            </div>
        );
    }
}

export default Card;