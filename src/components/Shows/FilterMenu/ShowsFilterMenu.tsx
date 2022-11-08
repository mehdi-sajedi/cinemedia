import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import styles from './ShowsFilterMenu.module.scss';
import { watchProviders } from '../../../data/watchProviders';
import CustomRange from './CustomRange';
import CustomCheckbox from './CustomCheckbox';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';
import { initialShowFilterState } from '../../../data/initialShowFilterState';
import {
  getShows,
  updateFilterData,
  resetFilterData,
} from '../../../features/shows/showSlice';
import SortDropdown from './SortDropdown';
import StatusDropdown from './StatusDropdown';
import TypeDropdown from './TypeDropdown';
import GenreDropdown from './GenreDropdown';

const ShowsFilterMenu = () => {
  const dispatch = useAppDispatch();
  const { filterMenuOpen, filterData } = useAppSelector((state) => state.show);
  const [formData, setFormData] = useState(filterData);

  const applyFilters = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(updateFilterData(formData));
    dispatch(getShows());
  };

  const resetForm = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setFormData(initialShowFilterState);
    dispatch(resetFilterData());
    dispatch(getShows());
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
          <TypeDropdown formData={formData} setFormData={setFormData} />
          <div className={styles.lineBreak}></div>
          <StatusDropdown formData={formData} setFormData={setFormData} />
          <div className={styles.lineBreak}></div>
          <CustomRange
            formData={formData}
            setFormData={setFormData}
            name="Year"
            defaults={[1980, 2022]}
            state={formData.year}
            stateStr="year"
            min={1980}
            max={2022}
            step={1}
            tipFormatter={(v: number) => v}
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
            state={formData.rating}
            stateStr='rating'
            min={0}
            max={100}
            step={1}
            tipFormatter={(v: number) => `${v}%`}
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

          <div className={styles.lineBreak}></div>
          <div className={styles.watchProviders}>
            <h3 className={styles.watchProvidersTitle}>Services</h3>
            <ul className={styles.watchProvidersList}>
              {watchProviders.map((p) => (
                <CustomCheckbox
                  formData={formData}
                  setFormData={setFormData}
                  state={formData.services}
                  stateStr='services'
                  name={p.provider_name}
                  id={p.provider_id}
                  group="watch-providers"
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

export default React.memo(ShowsFilterMenu);
