import React, { useEffect, useContext } from 'react';
import { AppContext } from '../context/app-context';
import Card from './Card';
import _ from 'lodash';
import GridStyles from './Grid.module.scss';
import { useLocation } from 'react-router';

const Grid = ({ url, fromSearch }) => {
  const { appState, dispatch } = useContext(AppContext);
  const location = useLocation();
  console.log(location);

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
        return <Card {...entry} key={_.uniqueId()} />;
      })}
    </section>
  );
};

export default Grid;
