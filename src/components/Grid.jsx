import React, { useState, useEffect } from 'react';
import Card from './Card';
import _ from 'lodash';
import GridStyles from './Grid.module.scss';

const Grid = ({ url }) => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const getData = () => {
      fetch(url)
        .then((data) => data.json())
        .then((data) => {
          setResults(data.results);
          console.log(data.results);
        });
    };

    getData();
  }, [url]);

  return (
    <section className={GridStyles.grid}>
      {results.map((entry) => {
        return <Card {...entry} key={_.uniqueId()} />;
      })}
    </section>
  );
};

export default Grid;
