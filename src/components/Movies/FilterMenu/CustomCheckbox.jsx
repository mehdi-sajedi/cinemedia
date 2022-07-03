import React, { useContext } from 'react';
import { AppContext } from '../../../context/app-context';
import styles from './CustomCheckbox.module.scss';

const basePath = 'https://image.tmdb.org/t/p/original';

const CustomCheckbox = ({ id, name, action, group, route, state, img }) => {
  const { dispatchFilter } = useContext(AppContext);

  const toggleCheckbox = () => {
    dispatchFilter({ type: action, payload: { id, route } });
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
          <img src={`${basePath}${img}`} alt="" />
        ) : (
          name
        )}
      </label>
    </li>
  );
};

export default CustomCheckbox;
