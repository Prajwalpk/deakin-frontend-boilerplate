import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Card from '../../components/card/card';
import Chat from '../../components/chat/chat';
import M from 'materialize-css';
import { ThemeProvider } from 'styled-components';
import BotIcon from '../../images/lilybot.png'
import LoadingComponent from '../../components/loading/loading';

import Axios from 'axios';

// Chat theme
const theme = {
  background: '#f5f8fb',
  fontFamily: 'Helvetica Neue',
  //headerBgColor: '#44cdff',
  headerBgColor: 'Teal',
  headerFontColor: '#fff',
  headerFontSize: '15px',
  //botBubbleColor: '#44cdff',
  botBubbleColor: 'Teal',
  botFontColor: '#fff',
  userBubbleColor: '#fff',
  userFontColor: '#4a4a4a',
};

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
    let conversationUrl = 'http://localhost:8003/userInfo';
    Axios.get(conversationUrl).then((result) => {

      this.setState({
        depResults: result.data,
        cardLoaded: true
      })
    })
  }

  componentDidMount() {
    this.getDepResults();
  }

  handleCardClick(userId) {
    this.setState({
      userId: userId
    })

    //alert(`Clicked user : ${this.state.userId}`)
  }

  render() {
    if(!(typeof this.state.cardLoaded) === 'undefined' || !this.state.cardLoaded) {
    //if (!this.state.cardLoaded) {
      return (
        <div className="Home">
          <header className="App-header">
            <div className="container">
              <LoadingComponent loaderStyle="spinner-layer spinner-teal-only" />
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
                {
                  this.state.depResults.map((result, i) => (
                    <div key={i}>
                      <Link to={{ pathname: '/conversation', params: result.UserID }}>
                        <Card cardClass="col s12 m3 card hoverable" onClick={() => {this.handleCardClick(result.UserID)}}>
                          <div className="card-image black-text">
                            <img src={BotIcon}></img>
                          </div>
                          <div className="card-stacked">
                            <div className="card-content black-text">
                              <span className="flow-text left-align">
                                <ul>
                                  <li><i><h6>{result.UserID}</h6></i></li>
                                  <li><i><h6>Anxiety    : {result.Anxiety}</h6></i></li>
                                  <li><i><h6>Stress     : {result.Stress}</h6></i></li>
                                  <li><i><h6>Depression : {result.Depression}</h6></i></li>
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
            <ThemeProvider theme={theme}>
              <Chat />
            </ThemeProvider>
          </header>
        </div>
      );
    }
  }
}

export default Home;
