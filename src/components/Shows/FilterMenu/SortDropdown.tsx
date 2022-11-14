import { useAppSelector, useAppDispatch } from '../../../hooks';
import Select from 'react-select';
import styles from './SortDropdown.module.scss';
import { getShows, updateSortOption } from '../../../features/shows/showSlice';
import { ShowSort } from '../../../features/shows/showTypes';
import { dropdownStyles } from '../../../utilities/dropdownStyles';

interface optionsType {
  value: ShowSort;
  label: string;
}

const options: optionsType[] = [
  { value: 'popularity.desc', label: 'Popularity' },
  { value: 'vote_average.desc', label: 'Rating' },
  { value: 'first_air_date.desc', label: 'Newly released' },
];

const SortDropdown = () => {
  const dispatch = useAppDispatch();
  const { sort } = useAppSelector((state) => state.show);

  const sortName = options.find((opt) => opt.value === sort);

  const setSortOption = (o: any) => {
    dispatch(updateSortOption(o.value));
    dispatch(getShows());
  };

  return (
    <div className={styles.select}>
      <h3>Sort by</h3>
      <Select
        options={options}
        className={styles.dropdown}
        styles={dropdownStyles}
        onChange={setSortOption}
        defaultValue={sortName}
        value={sortName}
        isSearchable={false}
      />
    </div>
  );
};

export default SortDropdown;
