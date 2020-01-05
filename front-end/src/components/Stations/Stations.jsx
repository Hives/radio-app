import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import Controls from '../Controls/Controls';
import * as api from '../../api';

const Stations = () => {
  const [stations, setStations] = useState([]);
  const {tag} = useParams();

  useEffect(() => {
    api.getStationsByTag(tag).then(stations => setStations(stations));
  }, [tag]);

  return (
    <section>
      <h3>Tagged with "{tag}"</h3>
      <Controls stations={stations} />
    </section>
  );
};

export default Stations;
