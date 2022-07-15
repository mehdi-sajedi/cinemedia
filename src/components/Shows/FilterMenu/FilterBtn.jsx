import { useDispatch, useSelector } from 'react-redux';
import { toggleFilterMenu } from '../../../features/shows/showSlice';
import { FiSliders } from 'react-icons/fi';
import styles from './FilterBtn.module.scss';

const FilterBtn = () => {
  const dispatch = useDispatch();
  const { filterMenuOpen } = useSelector((state) => state.show);

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
