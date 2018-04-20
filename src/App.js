import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import './App.css';
import Header from './components/Header';
import List from './components/List';
import Create from './components/Create';
import Show from './components/Show';
import Login from './components/Login';

export const API_URL = 'http://localhost:8080/rest';

class App extends Component {
  state = {
    route: 'list',
    // can be id for show view or city for list view
    parameters: {},
  };

  changeRoute = (route, parameters = {}) => () => {
    this.setState({
      route,
      parameters,
    });
  }

  renderComponentFromRoute = () => {
    if (this.state.route === 'login') {
      return (
          <Login
            changeRoute={this.changeRoute}
          />
      );
    }

    if (this.state.route === 'create') {
      return (
          <Create
            changeRoute={this.changeRoute}
          />
      );
    }

    if (this.state.route === 'show') {
      return (
        <Show
          parameters={this.state.parameters}
          changeRoute={this.changeRoute}
        />
      );
    }

    return (
      <List
        parameters={this.state.parameters}
        changeRoute={this.changeRoute}
      />
    );
  }

  render() {
    return (
      <MuiThemeProvider>
        <div className="app-container">
          <Header changeRoute={this.changeRoute} />
          <div className="main-wrapper">
            {this.renderComponentFromRoute()}
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
