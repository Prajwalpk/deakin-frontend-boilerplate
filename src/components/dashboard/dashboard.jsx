import React, { Component } from 'react';
import Graph from '../graph/graph';
import LoadingComponent from '../loading/loading';
import Axios from 'axios';

class Dashboard extends Component {
    constructor(props) {
        super(props);

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
                        <h4 className="grey-text text-darken-3 lighten-3 left-align">Dashboard</h4>
                    </span>
                    <div className="card col s12 m6 l6" style={cardPadding}>
                        <Graph graphData={this.state.depResults} type="doughnut" average={true} />
                    </div>
                    <div className="card col s12 m5 l5" style={cardPadding}>
                        <Graph graphData={this.state.depResults} type="bar" average={true} />
                    </div>
                    <br />
                    <div className="card col s12 m6 l6" style={cardPadding}>
                        <Graph graphData={this.state.depResults} type="bar" average={true} />
                    </div>
                    <div className="card col s12 m5 l5" style={cardPadding}>
                        <Graph graphData={this.state.depResults} type="doughnut" average={true} />
                    </div>
                </div>
            )
        }
    }
}

export default Dashboard;