import React, { useContext } from 'react';
import { AppContext } from '../../context/app-context';
import styles from './CustomCheckbox.module.scss';

const basePath = 'https://image.tmdb.org/t/p/original';

const CustomCheckbox = ({ id, name, action, group, state, img }) => {
  const { filterState, dispatchFilter } = useContext(AppContext);

  const toggleCheckbox = () => {
    dispatchFilter({ type: action, payload: { id, name } });
  };

  return (
    <li className={styles.listItem}>
      <input
        type="checkbox"
        name={group}
        id={name}
        checked={filterState[state]?.includes(id)}
        onChange={toggleCheckbox}
        className={filterState[state]?.includes(id) ? styles.active : ''}
      />

      <label
        htmlFor={name}
        className={`${
          group === 'watch-providers' ? styles.watch : styles.text
        } ${
          filterState[state]?.length > 0 && !filterState[state]?.includes(id)
            ? styles.TERMINATE
            : ''
        }`}
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
