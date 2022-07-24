// import { useSelector } from 'react-redux';
import Select from 'react-select';
import styles from './GenreDropdown.module.scss';
import { movieGenres } from '../../../data/genres';
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();

const customStyles = {
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

const GenreDropdown = ({ formData, setFormData }) => {
  // const { filterData } = useSelector((state) => state.movie);

  // const current = movieGenres.filter((opt) =>
  //   filterData.genres.includes(opt.value)
  // );

  const handleGenreChange = (active) => {
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
        // defaultValue={current}
        value={formData.genres}
        isSearchable={false}
        isMulti={true}
        onChange={handleGenreChange}
        closeMenuOnSelect={false}
        components={animatedComponents}
      />
    </div>
  );
};

export default GenreDropdown;
