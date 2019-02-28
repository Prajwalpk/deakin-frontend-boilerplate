import React, { Component } from 'react';
import { history } from '../../helpers/router';
import AdminSidenav from '../../components/admin-sidenav/admin-sidenav'
import Dashboard from '../../components/dashboard/dashboard';
import Users from '../../components/users-view/users-view';
import Scores from '../../components/scores/scores';

import Axios from 'axios';

const views = {
  DASHBOARD: 'DASHBOARD',
  USERS: 'USERS',
  SCORES: 'SCORES'
}

class Home extends Component {

  constructor(props) {
    super(props);

    this.state = {
      depResults: [],
      cardLoaded: false,
      userId: '',
      views: views,
      currentView: views.DASHBOARD
    }

    this.handleSidenavClick = this.handleSidenavClick.bind(this);
  }

  /**
   * Get DASS results
   */
  getDepResults() {
    let conversationUrl = process.env.REACT_APP_LILY_API_BASE_URL + 'api/user/userScores';
    Axios.get(conversationUrl).then((result) => {

      this.setState({
        depResults: result.data.data,
        cardLoaded: true
      })
    })
  }

  /**
   * Handle inputs from the admin sidebar
   * @param {views} view 
   */
  handleSidenavClick(view) {
    this.setState({
      currentView: view
    })
  }

  /**
   * Render admin views
   */
  renderPanels() {
    switch (this.state.currentView) {
      case this.state.views.USERS:
        return <Users />
      case this.state.views.SCORES:
        return <Scores content={this.state.depResults} />
      default:
        return <Dashboard content={this.state.depResults} />
    }
  }

  componentDidMount() {
    let admin = window.localStorage.getItem("admin");

    if (admin !== null && admin === 'false') {
      history.push("/userhome");
    }
  }

  render() {
    return (
      <div className="Home grey lighten-4">
        <header className="App-header">
          <AdminSidenav currentView={this.state.currentView} onClick={this.handleSidenavClick} views={this.state.views} />
          <div className="row Sidebar-fix">
            {
              this.renderPanels()
            }
          </div>
        </header>
      </div>
    );
  }
}

export default Home;
