import styles from './CustomCheckbox.module.scss';
import { MovieFilterData } from '../../../features/movies/movieTypes';
import { imageBase } from '../../../data/imagePaths';

interface CustomCheckboxProps {
  formData: MovieFilterData;
  setFormData: React.Dispatch<React.SetStateAction<MovieFilterData>>;
  id: number;
  name: string;
  group: string;
  img: string;
  state: number[];
  stateStr: string;
}

const CustomCheckbox = ({
  formData,
  setFormData,
  id,
  name,
  group,
  state,
  stateStr,
  img,
}: CustomCheckboxProps) => {
  const toggleCheckbox = () => {
    let newState;

    if (state.includes(id)) {
      newState = state.filter((x) => x !== id);
    } else {
      newState = [...state, id];
    }
    setFormData({
      ...formData,
      [stateStr]: newState,
    });
  };

  return (
    <li className={styles.listItem}>
      <input
        type="checkbox"
        name={group}
        id={name}
        checked={state?.includes(id)}
        onChange={toggleCheckbox}
        className={state?.includes(id) ? styles.active : ''}
      />

      <label
        htmlFor={name}
        className={`${
          group === 'watch-providers' ? styles.watch : styles.text
        } ${state?.length > 0 && !state?.includes(id) ? styles.fade : ''}`}
      >
        {group === 'watch-providers' ? (
          <img src={`${imageBase}original${img}`} loading="lazy" alt="" />
        ) : (
          name
        )}
      </label>
    </li>
  );
};

export default CustomCheckbox;
