import styles from './CustomCheckbox.module.scss';
import { imageBase } from '../../../data/imagePaths';


const CustomCheckbox = ({
  formData,
  setFormData,
  id,
  name,
  group,
  state,
  img,
}) => {
  const toggleCheckbox = () => {
    let newState;

    if (formData[state].includes(id)) {
      newState = formData[state].filter((x) => x !== id);
    } else {
      newState = [...formData[state], id];
    }
    setFormData({
      ...formData,
      [state]: newState,
    });
  };

  return (
    <li className={styles.listItem}>
      <input
        type="checkbox"
        name={group}
        id={name}
        checked={formData[state]?.includes(id)}
        onChange={toggleCheckbox}
        className={formData[state]?.includes(id) ? styles.active : ''}
      />

      <label
        htmlFor={name}
        className={`${
          group === 'watch-providers' ? styles.watch : styles.text
        } ${
          formData[state]?.length > 0 && !formData[state]?.includes(id)
            ? styles.fade
            : ''
        }`}
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
