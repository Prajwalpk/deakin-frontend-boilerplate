import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Card from '../../components/card/card';
import LoadingComponent from '../../components/loading/loading';
import { history } from '../../helpers/router';
import Graph from '../../components/graph/graph'

import Axios from 'axios';
class Home extends Component {

  constructor(props) {
    super(props);

    this.state = {
      depResults: [],
      cardLoaded: false,
      userId: ''
    }

    this.getDepResults = this.getDepResults.bind(this);
    this.handleCardClick = this.handleCardClick.bind(this);
  }

  getDepResults() {
    let conversationUrl = process.env.REACT_APP_LILY_API_BASE_URL + 'api/user/userScores';
    Axios.get(conversationUrl).then((result) => {

      this.setState({
        depResults: result.data,
        cardLoaded: true
      })
    })
  }

  componentDidMount() {
    let admin = window.localStorage.getItem("admin");

    if (admin !== null && admin === 'false') {
      history.push("/userhome");
    } else {
      this.getDepResults();
    }
  }

  handleCardClick(userId) {
    this.setState({
      userId: userId
    })
  }

  render() {

    if (!(typeof this.state.cardLoaded) === 'undefined' || !this.state.cardLoaded) {
      return (
        <div className="Home">
          <header className="App-header">
            <div className="container">
              <LoadingComponent loaderStyle="spinner-layer spinner-blue-only" />
            </div>
          </header>
        </div>
      )
    } else {
      return (
        <div className="Home">
          <header className="App-header">
            <div className="container">
              <div className="row">
                <br />
                <div className="col s12 m4 l4">
                  <Graph graphData={this.state.depResults} type="doughnut" average={true} />
                </div>
                <div className="col m1 l1" />
                <div className="col s12 m7 l7">
                  <Graph graphData={this.state.depResults} type="bar" average={true} />
                </div>
                <span className="col s12 m12 l12">
                  <br />
                  <h4 className="grey-text text-darken-3 lighten-3">User Scores</h4>
                </span>
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
          </header>
          <div id="slide-out" className="sidenav">

          </div>
        </div>
      );
    }
  }
}

export default Home;
