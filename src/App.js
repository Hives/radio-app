import React, {useState, useEffect} from 'react';
import Controls from './components/Controls/Controls';
import * as api from './api';
import './App.css';

function App() {
  const [stations, setStations] = useState([]);

  useEffect(() => {
    api.getStations().then(stations => setStations(stations));
  }, []);

  return (
    <div className="App">
      <h1>Hello</h1>
      <Controls stations={stations} />
    </div>
  );
}

export default App;
