import React, { useContext, useRef } from 'react';
import { AppContext } from '../../context/app-context';
import styles from './FilterMenu.module.scss';
import { IoCloseOutline } from 'react-icons/io5';
import { createPortal } from 'react-dom';
import Slider, {
  createSliderWithTooltip,
  Range,
  SliderTooltip,
} from 'rc-slider';
import 'rc-slider/assets/index.css';

const FilterMenu = () => {
  const { appState, dispatch } = useContext(AppContext);
  const handle = useRef();

  const Range = createSliderWithTooltip(Slider.Range);

  const closeMenu = (e) => {
    console.log(e.target);
    if (
      e.target.classList.contains('overlay') ||
      e.target.classList.contains('closeBtn')
    ) {
      dispatch({ type: 'CLOSE-FILTER-MENU' });
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
  };

  const testing = (e) => {
    console.log(handle.current.sliderRef);
    // const first = handle.current.sliderRef.children.find((child) =>
    //   child.classList.contains('rc-slider-handle-1')
    // );
    // const second = handle.current.sliderRef.children.find((child) =>
    //   child.classList.contains('rc-slider-handle-2')
    // );

    // console.log(first.value);
  };

  const railStyle = {
    backgroundColor: '#333',
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
        <form onSubmit={handleFormSubmit} className={styles.form}>
          <Range
            railStyle={railStyle}
            onAfterChange={testing}
            min={60}
            max={240}
            ref={handle}
          />
          <button className={styles.submit} typeof="submit">
            Apply
          </button>
        </form>
      </div>
    </div>,
    document.getElementById('filterMenu')
  );
};

export default FilterMenu;
