import React, {useState, useEffect} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
  Link,
  useParams,
} from 'react-router-dom';
import Controls from './components/Controls/Controls';
import * as api from './api';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Pauly's radio</h1>
        <Link to="/tags">View tags</Link>
        {/* <Controls stations={stations} /> */}
      </div>
      <Switch>
        <Route path="/tags" component={Tags} />
        <Route path="/tag/:tag" component={Stations} />
        <Redirect exact from="/" to="/tags" />
      </Switch>
      <button onClick={e => api.stopPlaying()}>Stop</button>
    </Router>
  );
}

const Tags = () => {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    api.getTags().then(tags => setTags(tags));
  }, []);

  return (
    <div>
      <h2>Tags</h2>
      <ul>
        {tags.map(tag => (
          <li key={tag}>
            <Link to={`/tag/${tag}`}>{tag}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Stations = () => {
  const [stations, setStations] = useState([]);
  const {tag} = useParams();

  useEffect(() => {
    api.getStationsByTag(tag).then(stations => setStations(stations));
  }, [tag]);

  return <Controls stations={stations} />;
};

export default App;
