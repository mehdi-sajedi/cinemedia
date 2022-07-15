import { useDispatch, useSelector } from 'react-redux';
import { toggleFilterMenu } from '../../../features/movies/movieSlice';
import { FiSliders } from 'react-icons/fi';
import styles from './FilterBtn.module.scss';

const FilterBtn = () => {
  const dispatch = useDispatch();
  const { filterMenuOpen } = useSelector((state) => state.movie);

  const toggle = () => {
    dispatch(toggleFilterMenu());
  };

  return (
    <div className={styles.container}>
      <button
        onClick={toggle}
        className={`${filterMenuOpen ? styles.removePointer : ''} `}
      >
        <FiSliders />
      </button>
    </div>
  );
};

export default FilterBtn;
