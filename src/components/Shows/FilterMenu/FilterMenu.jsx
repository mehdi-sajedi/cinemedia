import React, { useState } from 'react';
import styles from './FilterMenu.module.scss';
import { createPortal } from 'react-dom';
import CustomRange from './CustomRange';
import { watchProviders } from '../../Utilities/watch-providers';
import CustomCheckbox from './CustomCheckbox';
import { IoCloseOutline } from 'react-icons/io5';
import { AiOutlineCalendar } from 'react-icons/ai';
import { FiStar } from 'react-icons/fi';
import { IoMdTime } from 'react-icons/io';
import { useSelector, useDispatch } from 'react-redux';
import { showGenres } from '../../../data/genres';
import { initialShowFilterState } from '../../../data/initialShowFilterState';
import {
  getShows,
  closeFilterMenu,
  updateFilterData,
  resetFilterData,
} from '../../../features/shows/showSlice';
import SortDropdown from './SortDropdown';
import StatusDropdown from './StatusDropdown';
import TypeDropdown from './TypeDropdown';

const FilterMenu = () => {
  const dispatch = useDispatch();
  const { filterMenuOpen, filterData } = useSelector((state) => state.show);
  const [formData, setFormData] = useState(filterData);

  const applyFilters = (e) => {
    e.preventDefault();
    dispatch(updateFilterData(formData));
    dispatch(getShows());
  };

  const resetForm = (e) => {
    e.preventDefault();
    setFormData(initialShowFilterState);
    dispatch(resetFilterData());
    dispatch(getShows());
    window.scrollTo(0, 0);
  };

  const closeMenu = (e) => {
    if (
      e.target.classList.contains('overlay') ||
      e.target.classList.contains('closeBtn') ||
      e.target.classList.contains('submit')
    ) {
      dispatch(closeFilterMenu());
    }
  };

  return createPortal(
    <>
      <div
        className={`${styles.overlay} ${
          filterMenuOpen ? styles.active : ''
        } overlay`}
        onClick={closeMenu}
      ></div>
      <div className={`${styles.menu} ${filterMenuOpen ? styles.active : ''} `}>
        <IoCloseOutline
          onClick={closeMenu}
          className={`${styles.closeBtn} ${
            !filterMenuOpen ? styles.removePointer : ''
          } closeBtn`}
        />
        <header className={styles.header}>Filters</header>
        <form onSubmit={applyFilters} className={styles.form}>
          <SortDropdown />
          <StatusDropdown formData={formData} setFormData={setFormData} />
          <TypeDropdown formData={formData} setFormData={setFormData} />
          <CustomRange
            formData={formData}
            setFormData={setFormData}
            name="Year"
            defaults={[1980, 2022]}
            state="year"
            min={1980}
            max={2022}
            step={1}
            tipFormatter={(v) => v}
            marks={{
              1980: {
                style: {
                  marginTop: '10px',
                },
                label: '1980',
              },
              2022: {
                style: {
                  marginTop: '10px',
                },
                label: '2022',
              },
            }}
            icon={<AiOutlineCalendar />}
          />

          <CustomRange
            formData={formData}
            setFormData={setFormData}
            name="Rating"
            defaults={[0, 100]}
            state="rating"
            min={0}
            max={100}
            step={1}
            tipFormatter={(v) => `${v}%`}
            marks={{
              0: {
                style: {
                  marginTop: '10px',
                },
                label: '0%',
              },
              100: {
                style: {
                  marginTop: '10px',
                },
                label: '100%',
              },
            }}
            icon={<FiStar />}
          />
          <CustomRange
            formData={formData}
            setFormData={setFormData}
            name="Runtime"
            defaults={[0, 240]}
            state="runtime"
            min={0}
            max={240}
            step={5}
            tipFormatter={(v) => `${v}m`}
            marks={{
              0: {
                style: {
                  marginTop: '10px',
                },
                label: '0m',
              },
              240: {
                style: {
                  marginTop: '10px',
                },
                label: '240m',
              },
            }}
            icon={<IoMdTime />}
          />
          {/* <div className={styles.lineBreak}></div> */}
          <div className={styles.genres}>
            <h3 className={styles.genresTitle}>Genres</h3>
            <ul className={styles.genresList}>
              {showGenres.map((obj) => (
                <CustomCheckbox
                  formData={formData}
                  setFormData={setFormData}
                  state="genres"
                  key={`${obj.id}-${obj.name}-show`}
                  name={obj.name}
                  id={obj.id}
                  group="show-genres"
                />
              ))}
            </ul>
          </div>

          {/* <div className={styles.lineBreak}></div> */}
          <div className={styles.watchProviders}>
            <h3 className={styles.watchProvidersTitle}>Services</h3>
            <ul className={styles.watchProvidersList}>
              {watchProviders.map((p) => (
                <CustomCheckbox
                  formData={formData}
                  setFormData={setFormData}
                  state="services"
                  key={`${p.provider_id}-${p.provider_name}`}
                  name={p.provider_name}
                  id={p.provider_id}
                  group="watch-providers"
                  img={p.logo_path}
                />
              ))}
            </ul>
          </div>

          <div className={styles.formButtons}>
            <button
              onClick={closeMenu}
              className={`${styles.submit} ${styles.btn} submit`}
              typeof="submit"
            >
              Apply
            </button>
            <button
              className={`${styles.reset} ${styles.btn}`}
              typeof="reset"
              onClick={resetForm}
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </>,
    document.getElementById('filterMenu')
  );
};

export default React.memo(FilterMenu);
