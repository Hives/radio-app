import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import * as api from '../../api';

const Tags = () => {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    api.getTags().then(tags => setTags(tags));
  }, []);

  return (
    <section>
      <h3>Tags</h3>
      <ul>
        {tags.map(tag => (
          <li key={tag}>
            <Link to={`/tag/${tag}`}>{tag}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Tags;
