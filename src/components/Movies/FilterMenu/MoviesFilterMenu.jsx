import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './MoviesFilterMenu.module.scss';
import CustomRange from './CustomRange';
import { watchProviders } from '../../../data/watchProviders';
import CustomCheckbox from './CustomCheckbox';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';
import { initialMovieFilterState } from '../../../data/initialMovieFilterState';
import {
  getMovies,
  updateFilterData,
  resetFilterData,
} from '../../../features/movies/movieSlice';
import SortDropdown from './SortDropdown';
import GenreDropdown from './GenreDropdown';

const MoviesFilterMenu = () => {
  const dispatch = useDispatch();
  const { filterMenuOpen, filterData } = useSelector((state) => state.movie);
  const [formData, setFormData] = useState(filterData);

  const applyFilters = (e) => {
    e.preventDefault();
    dispatch(updateFilterData(formData));
    dispatch(getMovies());
  };

  const resetForm = (e) => {
    e.preventDefault();
    setFormData(initialMovieFilterState);
    dispatch(resetFilterData());
    dispatch(getMovies());
    window.scrollTo(0, 0);
  };

  return (
    <>
      <div className={`${styles.menu} ${!filterMenuOpen ? styles.close : ''} `}>
        <form onSubmit={applyFilters} className={styles.form}>
          <SortDropdown />
          <div className={styles.lineBreak}></div>
          <GenreDropdown formData={formData} setFormData={setFormData} />
          <div className={styles.lineBreak}></div>
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
          />
          <div className={styles.lineBreak}></div>
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
          />

          <div className={styles.lineBreak}></div>
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
          <div className={styles.lineBreak}></div>
          <div className={styles.formButtons}>
            <button
              className={`${styles.submit} ${styles.btn} submit`}
              typeof="submit"
            >
              <div className={styles.content}>
                Apply <HiOutlineArrowNarrowRight />
              </div>
            </button>
            <button
              className={`${styles.reset} ${styles.btn}`}
              typeof="reset"
              onClick={resetForm}
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
