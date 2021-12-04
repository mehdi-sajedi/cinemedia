import React, { useEffect, useContext } from 'react';
import { AppContext } from '../../context/app-context';
import MediaCard from './MediaCard';
import _ from 'lodash';
import GridStyles from './Grid.module.scss';

const Grid = ({ url }) => {
  const { appState, dispatch } = useContext(AppContext);

  useEffect(() => {
    const getResults = async () => {
      const res = await fetch(url);
      const data = await res.json();
      dispatch({ type: 'SET-RESULTS', payload: data });
      console.log(data);
    };

    getResults();
  }, [dispatch, url]);

  return (
    <section className={GridStyles.grid}>
      {appState.results.results?.map((entry) => {
        return entry.poster_path && <MediaCard {...entry} key={_.uniqueId()} />;
      })}
    </section>
  );
};

export default Grid;
