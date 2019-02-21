import React, { Component } from 'react';
import Graph from '../graph/graph';
import Card from '../card/card';
import LoadingComponent from '../loading/loading';

class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            depResults: []
        }
    }

    componentDidMount() {
        this.setState({
            depResults: this.props.content
        })
    }

    render() {
        if ((typeof this.state.depResults) === 'undefined' || !this.state.depResults) {
            return (
                <div className="Home">
                    <div className="container">
                        <LoadingComponent loaderStyle="spinner-layer spinner-blue-only" />
                    </div>
                </div>
            )
        } else {
            return (
                <div className="container">
                    <span className="col s12 m12 l12">
                        <h4 className="grey-text text-darken-3 lighten-3 left-align">Dashboard</h4>
                    </span>
                    <div className="card col s12 m5 l5">
                        <Graph graphData={this.state.depResults} type="doughnut" average={true} />
                    </div>
                    <div className="col m1 l1" />
                    <div className="card col s12 m6 l6">
                        <Graph graphData={this.state.depResults} type="bar" average={true} />
                    </div>
                    <br />
                    <div className="card col s12 m6 l6">
                        <Graph graphData={this.state.depResults} type="bar" average={true} />
                    </div>
                    <div className="col m1 l1" />
                    <div className="card col s12 m5 l5">
                        <Graph graphData={this.state.depResults} type="doughnut" average={true} />
                    </div>
                </div>
            )
        }
    }
}

export default Dashboard;