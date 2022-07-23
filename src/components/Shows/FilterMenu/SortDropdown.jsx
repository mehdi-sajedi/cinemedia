import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import styles from './SortDropdown.module.scss';
import { getShows, updateSortOption } from '../../../features/shows/showSlice';

const options = [
  { value: 'popularity.desc', label: 'Popularity' },
  { value: 'vote_average.desc', label: 'Rating' },
  { value: 'first_air_date.desc', label: 'Newly released' },
];

const customStyles = {
  control: (styles) => ({ ...styles, cursor: 'pointer', fontSize: '15px' }),
  option: (styles) => ({ ...styles, cursor: 'pointer', fontSize: '14px' }),
};

const SortDropdown = () => {
  const dispatch = useDispatch();
  const { sort } = useSelector((state) => state.show);

  const sortName = options.find((opt) => opt.value === sort);

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
        defaultValue={sortName}
        value={sortName}
        isSearchable={false}
      />
    </div>
  );
};

export default SortDropdown;
