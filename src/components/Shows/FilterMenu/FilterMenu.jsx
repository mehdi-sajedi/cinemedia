import React, { useState } from 'react';
import styles from './FilterMenu.module.scss';
import { useLocation } from 'react-router-dom';
import { createPortal } from 'react-dom';
import CustomRange from './CustomRange';
import { watchProviders } from '../../Utilities/watch-providers';
import CustomCheckbox from './CustomCheckbox';
import { IoCloseOutline } from 'react-icons/io5';
import { AiOutlineCalendar } from 'react-icons/ai';
import { FiStar } from 'react-icons/fi';
import { IoMdTime } from 'react-icons/io';
import { useSelector, useDispatch } from 'react-redux';
import { showGenres } from '../../Utilities/helpers';
import { initialShowFilterState } from '../../../data/initialShowFilterState';
import {
  getShows,
  closeFilterMenu,
  updateFilterData,
  resetFilterData,
} from '../../../features/shows/showSlice';

const FilterMenu = () => {
  const dispatch = useDispatch();
  const { filterMenuOpen, filterData } = useSelector((state) => state.show);
  const [formData, setFormData] = useState(filterData);

  const { pathname } = useLocation();
  const route = pathname.includes('movies') ? 'movies' : 'shows';

  const applyFilters = (e) => {
    e.preventDefault();
    dispatch(updateFilterData(formData));
    dispatch(getShows(1));
  };

  const resetForm = (e) => {
    e.preventDefault();
    setFormData(initialShowFilterState);
    dispatch(resetFilterData());
    dispatch(getShows(1));
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
          <CustomRange
            formData={formData}
            setFormData={setFormData}
            name="Year"
            defaults={[1980, 2022]}
            // state={filterState[route].year.value}
            state="year"
            action="SET-YEAR"
            min={1980}
            max={2022}
            step={1}
            route={route}
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
            name="Runtime"
            defaults={[0, 240]}
            // state={filterState[route].runtime.value}
            state="runtime"
            action="SET-RUNTIME"
            min={0}
            max={240}
            step={5}
            route={route}
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
          <CustomRange
            formData={formData}
            setFormData={setFormData}
            name="Rating"
            defaults={[0, 100]}
            // state={filterState[route].rating.value}
            state="rating"
            action="SET-RATING"
            min={0}
            max={100}
            step={1}
            route={route}
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
          <div className={styles.genres}>
            <h3 className={styles.genresTitle}>Genres</h3>
            <ul className={styles.genresList}>
              {showGenres.map((obj) => (
                <CustomCheckbox
                  formData={formData}
                  setFormData={setFormData}
                  state="genres"
                  key={`${obj.id}-${obj.name}-${route}`}
                  name={obj.name}
                  id={obj.id}
                  group="show-genres"
                  action="TOGGLE-GENRE"
                  route={route}
                />
              ))}
            </ul>
          </div>

          <div className={styles.watchProviders}>
            <h3 className={styles.watchProvidersTitle}>Services</h3>
            <ul className={styles.watchProvidersList}>
              {watchProviders.map((provider) => (
                <CustomCheckbox
                  formData={formData}
                  setFormData={setFormData}
                  state="services"
                  key={`${provider.provider_id}-${provider.provider_name}`}
                  name={provider.provider_name}
                  id={provider.provider_id}
                  group="watch-providers"
                  action="TOGGLE-WATCH-PROVIDER"
                  route={route}
                  img={provider.logo_path}
                />
              ))}
            </ul>
          </div>

          <div className={styles.formButtons}>
            <button
              className={`${styles.reset} ${styles.btn}`}
              typeof="reset"
              onClick={resetForm}
            >
              Reset
            </button>
            <button
              onClick={closeMenu}
              className={`${styles.submit} ${styles.btn} submit`}
              typeof="submit"
            >
              Apply
            </button>
          </div>
        </form>
      </div>
    </>,
    document.getElementById('filterMenu')
  );
};

export default React.memo(FilterMenu);
