import Select from 'react-select';
import styles from './GenreDropdown.module.scss';
import { movieGenres } from '../../../data/genres';
import makeAnimated from 'react-select/animated';
import { MovieFilterData } from '../../../features/movies/movieTypes';
import { dropdownStyles } from '../../../utilities/dropdownStyles';
const animatedComponents = makeAnimated();

interface GenreDropdownProps {
  formData: MovieFilterData;
  setFormData: React.Dispatch<React.SetStateAction<MovieFilterData>>;
}

const GenreDropdown = ({ formData, setFormData }: GenreDropdownProps) => {
  const handleGenreChange = (active: any) => {
    setFormData({
      ...formData,
      genres: active,
    });
  };

  return (
    <div className={styles.select}>
      <h3>Genre</h3>
      <Select
        options={movieGenres}
        className={styles.dropdown}
        styles={dropdownStyles}
        value={formData.genres}
        isSearchable={false}
        isMulti={true}
        onChange={handleGenreChange}
        components={animatedComponents}
      />
    </div>
  );
};

export default GenreDropdown;
