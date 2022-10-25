import Select from "react-select";
import styles from "./GenreDropdown.module.scss";
import { movieGenres } from "../../../data/genres";
import makeAnimated from "react-select/animated";
import { IFilterData } from "../../../features/movies/movieSlice";

const animatedComponents = makeAnimated();

const customStyles = {
  control: (styles: any) => ({
    ...styles,
    cursor: "pointer",
    fontSize: "15px",
  }),
  option: (styles: any) => ({
    ...styles,
    cursor: "pointer",
    fontSize: "14px",
  }),
};

interface GenreDropdownProps {
  formData: IFilterData;
  setFormData: React.Dispatch<React.SetStateAction<IFilterData>>;
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
        closeMenuOnSelect={false}
        components={animatedComponents}
      />
    </div>
  );
};

export default GenreDropdown;
