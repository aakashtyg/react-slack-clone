import React, { Component } from 'react';
import { Sidebar, MainContainer } from './';

class Slack extends Component {
  render() {
    return (
      <div id="slack">
        <Sidebar />
        <MainContainer />
      </div>
    );
  }
}

export default Slack;
