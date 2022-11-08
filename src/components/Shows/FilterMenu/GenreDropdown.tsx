import Select from 'react-select';
import styles from './GenreDropdown.module.scss';
import { showGenres } from '../../../data/genres';
import makeAnimated from 'react-select/animated';
import { ShowFilterData } from '../../../features/shows/showTypes';
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
  formData: ShowFilterData;
  setFormData: React.Dispatch<React.SetStateAction<ShowFilterData>>;
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
        options={showGenres}
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
