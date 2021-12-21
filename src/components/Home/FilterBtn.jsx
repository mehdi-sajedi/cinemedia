import React, { useContext } from 'react';
import { AppContext } from '../../context/app-context';
import { FiSliders } from 'react-icons/fi';
import styles from './FilterBtn.module.scss';

const FilterBtn = () => {
  const { appState, dispatch } = useContext(AppContext);

  const toggleFilterMenu = (e) => {
    console.log(e.target);
    dispatch({ type: 'TOGGLE-FILTER-MENU' });
  };

  return (
    <div className={styles.container}>
      <div
        className={`${styles.btnWrap} ${
          appState.filterMenuOpen ? styles.removePointer : ''
        } `}
        onClick={toggleFilterMenu}
      >
        <FiSliders className={styles.btn} />
      </div>
    </div>
  );
};

export default FilterBtn;
