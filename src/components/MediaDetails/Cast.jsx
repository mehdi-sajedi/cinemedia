import React, { useContext } from 'react';
import { AppContext } from '../../context/app-context';
import styles from './Cast.module.scss';
import CastCard from './CastCard';
import _ from 'lodash';

const Cast = () => {
  const { appState } = useContext(AppContext);
  console.log(appState.currentMedia.cast);
  return (
    <section className={styles.cast}>
      <h2 className={styles.heading}>Cast</h2>
      <div className={styles.castGrid}>
        {appState.currentMedia?.credits?.cast?.map((member, idx) => {
          return (
            member.profile_path &&
            idx < 20 && <CastCard {...member} key={_.uniqueId()} />
          );
        })}
      </div>
    </section>
  );
};

export default Cast;
