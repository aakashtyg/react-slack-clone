import React, { useContext } from 'react';
import { Switch, Route } from 'react-router-dom';
import { SignIn, Slack } from './';
import { UserContext } from '../providers/UserProvider';

function App() {
  const auth = useContext(UserContext);
  console.log('App -> auth', auth);

  if (auth.loading) {
    return <h1>Loading!</h1>;
  }

  return (
    <div>
      <Switch>
        <Route exact path="/login" component={SignIn} />
        <Route exact path="/signup" component={SignIn} />
        <Route exact path="/" component={Slack} />
        {/* <Route exact path="/slack" component={Slack} /> */}
      </Switch>
    </div>
  );
}

export default App;
