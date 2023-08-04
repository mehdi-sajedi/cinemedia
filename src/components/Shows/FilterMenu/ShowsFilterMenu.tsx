import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import styles from './ShowsFilterMenu.module.scss';
import { watchProviders } from '../../../data/watchProviders';
import ShowsCustomRange from './ShowsCustomRange';
import ShowsServiceItem from './ShowsServiceItem';
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
import { markStyles } from '../../../utilities/CustomRangeMarksStyles';

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
  ];

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
          {rangeProps.map((r) => (
            <ShowsCustomRange
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
                <ShowsServiceItem
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
            >
              <span className={styles.content}>
                Apply <HiOutlineArrowNarrowRight />
              </span>
            </button>
            <button
              className={`${styles.reset} ${styles.btn}`}
              typeof='reset'
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
