import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
  Link,
} from 'react-router-dom';
import Stations from './components/Stations/Stations';
import Status from './components/Status/Status';
import Tags from './components/Tags/Tags';
import * as api from './api';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header>
          <h1>Pauly's radio</h1>
        </header>
        <Status />
        <section>
          <Link to="/tags">View station tags</Link>
        </section>
        <Switch>
          <Route path="/tags" component={Tags} />
          <Route path="/tag/:tag" component={Stations} />
          <Redirect exact from="/" to="/tags" />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
