import { useAppSelector, useAppDispatch } from '../../../hooks';
import { toggleFilterMenu } from '../../../features/shows/showSlice';
import { IoOptionsOutline } from 'react-icons/io5';
import styles from './FilterBtn.module.scss';

const FilterBtn = () => {
  const dispatch = useAppDispatch();
  const { filterMenuOpen } = useAppSelector((state) => state.show);

  const toggle = () => {
    dispatch(toggleFilterMenu());
  };

  return (
    <div className={styles.container}>
      <button onClick={toggle}>
        <IoOptionsOutline />
        <span>{filterMenuOpen ? 'Hide Filters' : 'Show Filters'}</span>
      </button>
    </div>
  );
};

export default FilterBtn;
