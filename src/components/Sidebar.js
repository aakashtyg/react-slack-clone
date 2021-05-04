import { useState } from 'react';
import { auth, firestore, signOut } from '../firebase';
import { Link } from 'react-router-dom';
<script
  src="https://kit.fontawesome.com/fc31dedf63.js"
  crossorigin="anonymous"
></script>;

function Sidebar(props) {
  const { channels } = props;
  const [channelName, setChannelName] = useState('');

  function handleJoinChannel(e) {
    setChannelName(e.target.value);
  }

  function onEnterPress(e) {
    var users = [],
      cid;
    if (e.keyCode === 13 && e.target.value) {
      e.preventDefault();

      console.log(e.target.value);
      const data = {
        id: auth.currentUser.uid,
      };

      firestore
        .collection('channels')
        .where('name', '==', e.target.value)
        .get()
        .then((snapshot) => {
          snapshot.docs.map((doc) => {
            users = doc.data()['members'];
          });
        });

      firestore
        .collection('channels')
        .where('name', '==', e.target.value)
        .get()
        .then((snapshot) => {
          snapshot.docs.map((doc) => {
            cid = doc.id;
          });
          if (users.includes(data.id)) {
            document.getElementById('check').innerHTML =
              '<h4>You are already member of this channel</h2>';
          } else if (cid) {
            firestore
              .collection('channels')
              .where('name', '==', e.target.value)
              .get()
              .then((snapshot) => {
                snapshot.docs.map((doc) => {
                  users = doc.data()['members'];
                  users.push(data.id);
                  console.log('data', data.id);
                  console.log('users', users);
                });
              });
            firestore
              .collection('channels')
              .get()
              .then((snapshot) => {
                snapshot.docs.map((doc) => {
                  console.log('doc', doc.data());
                });
              });
          } else {
            document.getElementById('check').innerHTML =
              '<h4>No such channel exist</h4>';
          }
        });
    }
  }

  return (
    <div id="sidebar">
      <div className="user-profile">
        <div className="avatar">
          <img
            src="https://www.flaticon.com/svg/static/icons/svg/2919/2919600.svg"
            alt=""
          />
        </div>
        <div>Home</div>
        <div
          style={{ marginLeft: 10, marginTop: 2, cursor: 'pointer' }}
          onClick={signOut}
        >
          <img
            src="https://www.flaticon.com/svg/static/icons/svg/2150/2150480.svg"
            alt=""
            height="25"
          />
        </div>
      </div>
      <hr className="sidebar-spacer" />

      <div className="channels">
        <div className="header">Channels</div>

        <ul className="channels-list">
          {channels.map((channel) => (
            <li key={channel.id}>
              <Link to={`/?id=${channel.id}`}># {channel.name}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <input
          type="text"
          placeholder="search channel to join"
          onChange={handleJoinChannel}
          onKeyDown={onEnterPress}
          value={channelName}
        />
        <div style={{ color: 'wheat' }} id="check"></div>
      </div>
    </div>
  );
}

export default Sidebar;
