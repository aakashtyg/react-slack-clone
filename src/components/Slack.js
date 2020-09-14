import React, { Component } from 'react';
import { Sidebar, MainContainer } from './';

class Slack extends Component {
  render() {
    return (
      <div>
        <Sidebar />
        <MainContainer />
      </div>
    );
  }
}

export default Slack;
