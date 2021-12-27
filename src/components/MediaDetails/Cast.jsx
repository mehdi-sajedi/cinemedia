import React, { useContext } from 'react';
import { AppContext } from '../../context/app-context';
import styles from './Cast.module.scss';
import CastCard from './CastCard';

const Cast = () => {
  const { appState } = useContext(AppContext);
  return (
    <div className={styles.cast}>
      <h2 className={styles.heading}>Cast</h2>
      <div className={styles.castGrid}>
        {appState.currentMedia?.credits?.cast?.map((member, idx) => {
          return (
            member.profile_path &&
            idx < 20 && (
              <CastCard {...member} key={`${member.id}-${member.popularity}`} />
            )
          );
        })}
      </div>
    </div>
  );
};

export default Cast;
