import { useAppSelector, useAppDispatch } from "../../../hooks";
import Select from "react-select";
import styles from "./SortDropdown.module.scss";
import {
  getMovies,
  updateSortOption,
} from "../../../features/movies/movieSlice";

const options = [
  { value: "popularity.desc", label: "Popularity" },
  { value: "vote_average.desc", label: "Rating" },
  { value: "primary_release_date.desc", label: "Newly released" },
  { value: "revenue.desc", label: "Revenue" },
  { value: "vote_count.desc", label: "Review count" },
];

const customStyles = {
  control: (styles: any) => ({
    ...styles,
    cursor: "pointer",
    fontSize: "15px",
  }),
  option: (styles: any) => ({ ...styles, cursor: "pointer", fontSize: "14px" }),
};

const SortDropdown = () => {
  const dispatch = useAppDispatch();
  const { sort } = useAppSelector((state) => state.movie);

  const sortName = options.find((opt) => opt.value === sort);

  const setSortOption = (o: any) => {
    dispatch(updateSortOption(o.value));
    dispatch(getMovies());
  };

  return (
    <div className={styles.select}>
      <h3>Sort by</h3>
      <Select
        options={options}
        className={styles.dropdown}
        styles={customStyles}
        onChange={setSortOption}
        defaultValue={sortName}
        value={sortName}
        isSearchable={false}
      />
    </div>
  );
};

export default SortDropdown;
