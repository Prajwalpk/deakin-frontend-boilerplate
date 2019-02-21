import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Card from '../../components/card/card';

class Scores extends Component {
    constructor(props) {
        super(props)

        this.state = {
            depResults: []
        }
    }

    componentDidMount() {
        console.log(this.props.content)
        this.setState({
            depResults: this.props.content
        })
    }

    render() {
        return (
            <div className="container">
                <span className="col s12 m12 l12">
                    <h4 className="grey-text text-darken-3 lighten-3 left-align">User Scores</h4>
                </span>
                <div>
                    {
                        this.state.depResults.map((result, i) => (
                            <div key={i}>
                                <Link to={{ pathname: '/conversation', params: result }}>
                                    <Card cardClass="col s12 m4 l3 card hoverable small" onClick={() => { this.handleCardClick(result.userId) }}>
                                        <div className="card-image black-text">
                                            {/*<img src={BotIcon} className="circle"></img>*/}
                                        </div>
                                        <div className="card-stacked">
                                            <div className="card-content black-text">
                                                <span className="flow-text left-align">
                                                    <ul>
                                                        <li><i><h6>{result.userId}</h6></i></li>
                                                        <li><i><h6>Anxiety    : {result.anxiety}</h6></i></li>
                                                        <li><i><h6>Stress     : {result.stress}</h6></i></li>
                                                        <li><i><h6>Depression : {result.depression}</h6></i></li>
                                                    </ul>
                                                </span>
                                            </div>
                                        </div>
                                    </Card>
                                </Link>
                            </div>
                        ))
                    }
                </div>
            </div>
        )
    }
}

export default Scores;