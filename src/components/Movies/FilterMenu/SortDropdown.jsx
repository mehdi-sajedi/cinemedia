import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import styles from './SortDropdown.module.scss';
import {
  getMovies,
  updateSortOption,
} from '../../../features/movies/movieSlice';

const options = [
  { value: 'popularity.desc', label: 'Popularity' },
  { value: 'vote_average.desc', label: 'Rating' },
  { value: 'primary_release_date.desc', label: 'Newly released' },
  { value: 'revenue.desc', label: 'Revenue' },
  { value: 'vote_count.desc', label: 'Review count' },
];

const customStyles = {
  control: (styles) => ({ ...styles, cursor: 'pointer', fontSize: '15px' }),
  option: (styles) => ({ ...styles, cursor: 'pointer', fontSize: '14px' }),
};

const SortDropdown = () => {
  const dispatch = useDispatch();
  const { sort } = useSelector((state) => state.movie);

  const sortName = options.find((opt) => opt.value === sort);

  const setSortOption = (o) => {
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
