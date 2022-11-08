import Select from 'react-select';
import styles from './GenreDropdown.module.scss';
import { movieGenres } from '../../../data/genres';
import makeAnimated from 'react-select/animated';
import { MovieFilterData } from '../../../features/movies/movieTypes';
import { StylesConfig } from 'react-select';

const animatedComponents = makeAnimated();

const customStyles: StylesConfig = {
  control: (styles) => ({
    ...styles,
    cursor: 'pointer',
    fontSize: '15px',
  }),
  option: (styles) => ({
    ...styles,
    cursor: 'pointer',
    fontSize: '14px',
  }),
};

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
        styles={customStyles}
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
