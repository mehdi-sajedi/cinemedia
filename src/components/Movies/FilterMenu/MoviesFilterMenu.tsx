import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../../hooks';
import styles from './MoviesFilterMenu.module.scss';
import { watchProviders } from '../../../data/watchProviders';
import MoviesCustomRange from './MoviesCustomRange';
import MoviesServiceItem from './MoviesServiceItem';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';
import { initialMovieFilterState } from '../../../data/initialMovieFilterState';
import {
  getMovies,
  updateFilterData,
  resetFilterData,
} from '../../../features/movies/movieSlice';
import SortDropdown from './SortDropdown';
import GenreDropdown from './GenreDropdown';
import { markStyles } from '../../../utilities/CustomRangeMarksStyles';

const MoviesFilterMenu = () => {
  const dispatch = useAppDispatch();
  const { filterMenuOpen, filterData } = useAppSelector((state) => state.movie);
  const [formData, setFormData] = useState(filterData);

  const applyFilters = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(updateFilterData(formData));
    dispatch(getMovies());
  };

  const resetForm = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setFormData(initialMovieFilterState);
    dispatch(resetFilterData());
    dispatch(getMovies());
    window.scrollTo(0, 0);
  };

  const rangeProps = [
    {
      name: 'year',
      min: 1980,
      max: 2023,
      step: 1,
      tipFormatter: (v: number) => v,
      state: formData.year,
      marks: markStyles.year,
    },
    {
      name: 'rating',
      min: 0,
      max: 100,
      step: 1,
      tipFormatter: (v: number) => v + '%',
      state: formData.rating,
      marks: markStyles.rating,
    },
    {
      name: 'runtime',
      min: 0,
      max: 240,
      step: 5,
      tipFormatter: (v: number) => v + 'm',
      state: formData.runtime,
      marks: markStyles.runtime,
    },
  ];

  return (
    <>
      <div className={`${styles.menu} ${!filterMenuOpen ? styles.close : ''} `}>
        <form onSubmit={applyFilters} className={styles.form}>
          <SortDropdown />
          <div className={styles.lineBreak}></div>
          <GenreDropdown formData={formData} setFormData={setFormData} />
          <div className={styles.lineBreak}></div>
          {rangeProps.map((r) => (
            <MoviesCustomRange
              key={r.name}
              formData={formData}
              setFormData={setFormData}
              name={r.name}
              min={r.min}
              max={r.max}
              step={r.step}
              state={r.state}
              marks={r.marks}
              tipFormatter={r.tipFormatter}
            />
          ))}
          <div className={styles.lineBreak}></div>
          <div className={styles.watchProviders}>
            <h3 className={styles.watchProvidersTitle}>Services</h3>
            <ul className={styles.watchProvidersList}>
              {watchProviders.map((p) => (
                <MoviesServiceItem
                  formData={formData}
                  setFormData={setFormData}
                  state={formData.services}
                  stateStr='services'
                  id={p.provider_id}
                  name={p.provider_name}
                  img={p.logo_path}
                  key={`${p.provider_id}-${p.provider_name}`}
                />
              ))}
            </ul>
          </div>
          <div className={styles.lineBreak}></div>
          <div className={styles.formButtons}>
            <button
              className={`${styles.submit} ${styles.btn} submit`}
              typeof='submit'
              aria-label='Apply filters'
            >
              <span className={styles.content}>
                Apply <HiOutlineArrowNarrowRight />
              </span>
            </button>
            <button
              className={`${styles.reset} ${styles.btn}`}
              typeof='reset'
              onClick={resetForm}
              aria-label='Clear all filters'
            >
              Clear All
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default React.memo(MoviesFilterMenu);
