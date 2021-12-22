import React, { useContext } from 'react';
import { AppContext } from '../../context/app-context';
import styles from './FilterMenu.module.scss';
import { IoCloseOutline } from 'react-icons/io5';
import { createPortal } from 'react-dom';
import CustomRange from './CustomRange';

const FilterMenu = () => {
  const { appState, dispatch, filterState, dispatchFilter } =
    useContext(AppContext);

  const closeMenu = (e) => {
    if (
      e.target.classList.contains('overlay') ||
      e.target.classList.contains('closeBtn')
    ) {
      dispatch({ type: 'CLOSE-FILTER-MENU' });
    }
  };

  const resetForm = () => {
    dispatchFilter({ type: 'RESET' });
  };

  const applyFilters = (e) => {
    e.preventDefault();
    dispatch({ type: 'APPLY-FILTERS', payload: filterState });
  };

  return createPortal(
    <div
      className={`${styles.overlay} ${
        appState.filterMenuOpen ? styles.active : ''
      } overlay`}
      onMouseDown={closeMenu}
    >
      <div className={`${styles.menu}  `}>
        <IoCloseOutline
          className={`${styles.closeBtn} ${
            !appState.filterMenuOpen ? styles.removePointer : ''
          } closeBtn`}
        />
        <header className={styles.header}>Filter & Sort</header>
        <form onSubmit={applyFilters} className={styles.form}>
          <CustomRange
            name="Year"
            defaults={[1980, 2022]}
            state={filterState.year.value}
            action="SET-YEAR"
            min={1980}
            max={2022}
            step={1}
            tipFormatter={(v) => v}
            marks={{
              1980: `1980`,
              2022: `2022`,
            }}
          />
          <CustomRange
            name="Runtime"
            defaults={[0, 240]}
            state={filterState.runtime.value}
            action="SET-RUNTIME"
            min={0}
            max={240}
            step={10}
            tipFormatter={(v) => `${v}m`}
            marks={{
              0: `0m`,
              240: `240m`,
            }}
          />
          <CustomRange
            name="Rating"
            defaults={[0, 100]}
            state={filterState.rating.value}
            action="SET-RATING"
            min={0}
            max={100}
            step={1}
            tipFormatter={(v) => `${v}`}
            marks={{
              0: `0`,
              100: `100`,
            }}
          />
          <div className={styles.formButtons}>
            <button
              className={`${styles.reset} ${styles.btn}`}
              typeof="reset"
              onClick={resetForm}
            >
              Reset
            </button>
            <button
              className={`${styles.submit} ${styles.btn}`}
              typeof="submit"
            >
              Apply
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.getElementById('filterMenu')
  );
};

export default React.memo(FilterMenu);
