import React, { useState } from "react";
import { useAppSelector, useAppDispatch } from "../../../hooks";
import styles from "./MoviesFilterMenu.module.scss";
import { watchProviders } from "../../../data/watchProviders";
import CustomRange from "./CustomRange";
import CustomCheckbox from "./CustomCheckbox";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { initialMovieFilterState } from "../../../data/initialMovieFilterState";
import {
  getMovies,
  updateFilterData,
  resetFilterData,
} from "../../../features/movies/movieSlice";
import SortDropdown from "./SortDropdown";
import GenreDropdown from "./GenreDropdown";

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

  return (
    <>
      <div className={`${styles.menu} ${!filterMenuOpen ? styles.close : ""} `}>
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
            state={formData.year}
            stateStr="year"
            min={1980}
            max={2022}
            step={1}
            tipFormatter={(v: number) => v}
            marks={{
              1980: {
                style: {
                  marginTop: "10px",
                },
                label: "1980",
              },
              2022: {
                style: {
                  marginTop: "10px",
                },
                label: "2022",
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
            stateStr="rating"
            min={0}
            max={100}
            step={1}
            tipFormatter={(v: number) => `${v}%`}
            marks={{
              0: {
                style: {
                  marginTop: "10px",
                },
                label: "0%",
              },
              100: {
                style: {
                  marginTop: "10px",
                },
                label: "100%",
              },
            }}
          />

          <CustomRange
            formData={formData}
            setFormData={setFormData}
            name="Runtime"
            defaults={[0, 240]}
            state={formData.runtime}
            stateStr="runtime"
            min={0}
            max={240}
            step={5}
            tipFormatter={(v: number) => `${v}m`}
            marks={{
              0: {
                style: {
                  marginTop: "10px",
                },
                label: "0m",
              },
              240: {
                style: {
                  marginTop: "10px",
                },
                label: "240m",
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
                  stateStr="services"
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

export default React.memo(MoviesFilterMenu);
