import { useDispatch, useSelector } from 'react-redux';
import { toggleHideEpisodes } from '../../features/shows/showSlice';
import styles from './ToggleBtn.module.scss';

const ToggleBtn = () => {
  const dispatch = useDispatch();
  const { hideEpisodes } = useSelector((state) => state.show);

  const onChange = (e) => {
    console.log('onChange');
    dispatch(toggleHideEpisodes(e.target.checked));
    localStorage.setItem('hideEpisodes', e.target.checked);
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
