import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Card from '../../components/card/card';
import LoadingComponent from '../loading/loading';

import Axios from 'axios';

class Scores extends Component {
    constructor(props) {
        super(props)

        this.state = {
            depResults: [],
            resultsLoaded: false
        }
    }

    /**
    * Get DASS results
    */
    getDepResults() {
        let conversationUrl = process.env.REACT_APP_LILY_API_BASE_URL + 'api/user/userScores';
        Axios.get(conversationUrl).then((result) => {

            this.setState({
                depResults: result.data.data,
                resultsLoaded: true
            })
        })
    }

    componentDidMount() {
        this.getDepResults();
    }

    render() {
        var padding = {
            marginLeft: '5%',
            marginRight: '5%'
        }

        var cardPadding = {
            marginLeft: '2%',
            marginRight: '2%'
        }

        if ((typeof this.state.depResults) === 'undefined' || !this.state.depResults || !this.state.resultsLoaded) {
            return (
                <div className="Home">
                    <div className="container">
                        <LoadingComponent loaderStyle="spinner-layer spinner-blue-only" />
                    </div>
                </div>
            )
        } else {
            return (
                <div className="" style={padding}>
                    <span className="col s12 m12 l12">
                        <h4 className="grey-text text-darken-3 lighten-3 left-align">DASS Scores</h4>
                    </span>
                    <div>
                        {
                            this.state.depResults.map((result, i) => (
                                <div key={i}>
                                    <Link to={{ pathname: '/conversation', params: result.userId }}>
                                        <Card cardClass="col s12 m4 l3 card hoverable" style={cardPadding}>
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
                                        <div className="col m0 l0"></div>
                                    </Link>
                                </div>
                            ))
                        }
                    </div>
                </div>
            )
        }
    }
}

export default Scores;