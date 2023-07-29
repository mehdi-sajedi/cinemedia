import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { toggleEpisodesHidden } from '../../features/shows/showSlice';
import styles from './HideEpisodesBtn.module.scss';

const HideEpisodesBtn = () => {
  const dispatch = useAppDispatch();
  const { episodesHidden } = useAppSelector((state) => state.show);
  const [btnPressed, setBtnPressed] = useState(episodesHidden);

  const onToggle = () => {
    setBtnPressed((prevState) => !prevState);
  };

  useEffect(() => {
    dispatch(toggleEpisodesHidden(btnPressed));
    localStorage.setItem('episodesHidden', JSON.stringify(btnPressed));
  }, [dispatch, btnPressed]);

  return (
    <div className={styles.wrapper}>
      <button
        className={`${styles.btn} ${btnPressed ? styles.active : ''}`}
        onClick={onToggle}
        aria-pressed={btnPressed}
        aria-label='Hide episodes'
      >
        <span className={styles.circle}></span>
      </button>
      <p className={styles.toggleText}>Hide episodes</p>
    </div>
  );
};

export default HideEpisodesBtn;
