import { useDispatch } from 'react-redux';
import Select from 'react-select';
import styles from './SortDropdown.module.scss';
import { getShows, updateSortOption } from '../../../features/shows/showSlice';

const options = [
  {
    value: 'popularity.desc',
    label: 'Popularity',
  },
  {
    value: 'vote_average.desc',
    label: 'Rating',
  },
  {
    value: 'first_air_date.desc',
    label: 'Newly released',
  },
];

const customStyles = {
  control: (styles, state) => ({
    ...styles,
    cursor: 'pointer',
  }),
  option: (styles, state) => ({
    ...styles,
    cursor: 'pointer',
  }),
};

const SortDropdown = () => {
  const dispatch = useDispatch();

  const setSortOption = (o) => {
    dispatch(updateSortOption(o.value));
    dispatch(getShows());
  };

  return (
    <div className={styles.sort}>
      <h3>Sort by</h3>
      <Select
        options={options}
        className={styles.dropdown}
        styles={customStyles}
        onChange={setSortOption}
        defaultValue={options[0]}
        isSearchable={false}
      />
    </div>
  );
};

export default SortDropdown;
