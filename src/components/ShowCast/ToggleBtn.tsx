import { useAppDispatch, useAppSelector } from '../../hooks';
import { toggleHideEpisodes } from '../../features/shows/showSlice';
import styles from './ToggleBtn.module.scss';
import React from 'react';

const ToggleBtn = () => {
  const dispatch = useAppDispatch();
  const { hideEpisodes } = useAppSelector((state) => state.show);

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;

    dispatch(toggleHideEpisodes(target.checked));
    localStorage.setItem('hideEpisodes', JSON.stringify(target.checked));
  };

  return (
    <div className={styles.wrapper}>
      <label className={styles.switch}>
        <input type="checkbox" onChange={onChange} checked={hideEpisodes} />
        <span className={styles.slider}></span>
      </label>
      <p className={styles.toggleText}>Hide episodes</p>
    </div>
  );
};

export default ToggleBtn;
