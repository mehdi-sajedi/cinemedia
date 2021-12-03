import React, { useEffect, useContext } from 'react';
import { AppContext } from '../context/app-context';
import Card from './Card';
import _ from 'lodash';
import GridStyles from './Grid.module.scss';

const Grid = ({ url }) => {
  const { appState, dispatch } = useContext(AppContext);

  useEffect(() => {
    const getResults = async () => {
      const res = await fetch(url);
      const { results } = await res.json();
      dispatch({ type: 'SET-RESULTS', payload: results });
      console.log(results);
    };

    getResults();
  }, [dispatch, url]);

  return (
    <section className={GridStyles.grid}>
      {appState.results.map((entry) => {
        return entry.poster_path && <Card {...entry} key={_.uniqueId()} />;
      })}
    </section>
  );
};

export default Grid;
