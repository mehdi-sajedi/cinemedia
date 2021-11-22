import React, { useEffect, useContext } from 'react';
import { AppContext } from '../context/app-context';
import Card from './Card';
import _ from 'lodash';
import GridStyles from './Grid.module.scss';

const Grid = ({ url, fromSearch }) => {
  const { appState, dispatch } = useContext(AppContext);

  useEffect(() => {
    const getResults = () => {
      fetch(url)
        .then((data) => data.json())
        .then(({ results }) => {
          dispatch({ type: 'SET-RESULTS', payload: results });
          console.log(results);
        })
        .catch((err) => console.error(err));
    };

    getResults();
  }, [dispatch, url, fromSearch]);

  return (
    <section className={GridStyles.grid}>
      {appState.results.map((entry) => {
        return entry.poster_path && <Card {...entry} key={_.uniqueId()} />;
      })}
    </section>
  );
};

export default Grid;
