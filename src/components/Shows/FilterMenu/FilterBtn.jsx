import { FiSliders } from 'react-icons/fi';
import styles from './FilterBtn.module.scss';
import { toggleFilterMenu } from '../../../features/shows/showSlice';
import { useDispatch, useSelector } from 'react-redux';

const FilterBtn = () => {
  const dispatch = useDispatch();
  const { filterMenuOpen } = useSelector((state) => state.show);

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
