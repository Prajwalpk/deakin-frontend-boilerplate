import React, { Component } from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';

class Graph extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {
            }
        }
        this.buildAverageGraph = this.buildAverageGraph.bind(this);
        this.buildIndividualGraph = this.buildIndividualGraph.bind(this);
    }

    /**
     * Build graph data for average scores.
     */
    buildAverageGraph() {
        let anxiety = 0, stress = 0, depression = 0;
        let length = this.props.graphData.length;

        this.props.graphData.forEach((results) => {
            anxiety += results.anxiety;
            stress += results.stress;
            depression += results.depression;
        })

        var data = {
            labels: ["Depression", "Anxiety", "Stress"],
            datasets: [{
                label: "Depression",
                backgroundColor: ['rgba(2, 163, 255, 0.5)', 'rgba(20, 245, 8, 0.5)', 'rgba(232, 115, 218, 0.5)'],
                data: [depression / length, anxiety/length, stress/length]
            }]
        }

        this.setState({
            data: data
        })
    }

    buildIndividualGraph() {
        var data = {
            labels: ["Depression", "Anxiety", "Stress"],
            datasets: [{
                label: "Depression",
                backgroundColor: ['rgba(2, 163, 255, 0.5)', 'rgba(20, 245, 8, 0.5)', 'rgba(232, 115, 218, 0.5)'],
                data: [this.props.graphData.depression, this.props.graphData.anxiety, this.props.graphData.stress]
            }]
        }

        this.setState({
            data: data
        })
    }

    componentDidMount() {
        // Build data to add to the graph 
        if(this.props.average) {
            this.buildAverageGraph();
        } else {
            this.buildIndividualGraph();
        }
    }

    render() {
        if(this.props.type === 'bar') {
            return (
                <div>
                    <Bar data={this.state.data} options={{ maintainAspectRatio: true}} />
                </div>
            )
        } else {
            return (
                <div>
                    <Doughnut data={this.state.data} options={{ maintainAspectRatio: true}} />
                </div>
            )
        }
    }
}

export default Graph;