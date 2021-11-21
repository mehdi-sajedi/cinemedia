import React, { useEffect, useContext } from 'react';
import { AppContext } from '../context/app-context';
import Card from './Card';
import _ from 'lodash';
import GridStyles from './Grid.module.scss';

const Grid = ({ url }) => {
  const { appState, dispatch } = useContext(AppContext);

  useEffect(() => {
    const getResults = () => {
      fetch(url)
        .then((data) => data.json())
        .then((data) => {
          dispatch({ type: 'SET-RESULTS', payload: data.results });
          console.log(data.results);
        })
        .catch((err) => console.error(err));
    };

    getResults();
  }, [dispatch, url]);

  return (
    <section className={GridStyles.grid}>
      {appState.results.map((entry) => {
        return <Card {...entry} key={_.uniqueId()} />;
      })}
    </section>
  );
};

export default Grid;
