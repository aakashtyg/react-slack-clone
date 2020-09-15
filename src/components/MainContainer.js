import React, { Component } from 'react';

function MainContainer(props) {
  const { channel } = props;
  console.log('MainContainer -> channel', channel);

  return (
    <div id="main-container">
      <div className="about-channel">
        <div className="channel-name"># {channel.name}</div>
        <div className="channel-desc">{channel.description}</div>
      </div>

      <div className="messages-list">
        <div className="message">
          <div className="left-block">
            <img src="https://ca.slack-edge.com/T0188513NTW-U01867WD8GK-ga631e27835b-72" />
          </div>
          <div className="right-block">
            <div className="user">
              <div>ZYZ</div>
              <span>1:21 PM</span>
            </div>
            <div className="user-message">Hey hello whats up?</div>
          </div>
        </div>

        <div className="message">
          <div className="left-block">
            <img src="https://ca.slack-edge.com/T0188513NTW-U01867WD8GK-ga631e27835b-72" />
          </div>
          <div className="right-block">
            <div className="user">
              <div>ZYZ</div>
              <span>1:21 PM</span>
            </div>
            <div className="user-message">Hey hello whats up?</div>
          </div>
        </div>
      </div>

      <div className="chat-box">
        <textarea placeholder="Type something and press enter ..."></textarea>
      </div>
    </div>
  );
}

export default MainContainer;
