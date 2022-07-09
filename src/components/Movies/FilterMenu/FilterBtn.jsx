import { FiSliders } from 'react-icons/fi';
import styles from './FilterBtn.module.scss';
import { toggleFilterMenu } from '../../../features/movies/movieSlice';
import { useDispatch, useSelector } from 'react-redux';

const FilterBtn = () => {
  const dispatch = useDispatch();
  const { filterMenuOpen } = useSelector((state) => state.movie);

  const onClick = (e) => {
    dispatch(toggleFilterMenu());
  };

  return (
    <div className={styles.container}>
      <div
        className={`${styles.btnWrap} ${
          filterMenuOpen ? styles.removePointer : ''
        } `}
        onClick={onClick}
      >
        <FiSliders className={styles.btn} />
      </div>
    </div>
  );
};

export default FilterBtn;
