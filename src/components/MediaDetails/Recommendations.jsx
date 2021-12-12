import React, { useContext } from 'react';
import { AppContext } from '../../context/app-context';
import styles from './Recommendations.module.scss';
import RecommendationsCard from './RecommendationsCard';
import _ from 'lodash';

const Recommendations = () => {
  const { appState } = useContext(AppContext);

  return (
    <div className={styles.recommendations}>
      <h2 className={styles.heading}>Recommendations</h2>
      <div className={styles.recommendationsGrid}>
        {appState.currentMedia?.recommendations?.map((entry, idx) => {
          return (
            entry.image &&
            idx < 6 && <RecommendationsCard {...entry} key={_.uniqueId()} />
          );
        })}
      </div>
    </div>
  );
};

export default Recommendations;
