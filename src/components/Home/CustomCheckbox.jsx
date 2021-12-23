import React, { useContext } from 'react';
import { AppContext } from '../../context/app-context';
import styles from './CustomCheckbox.module.scss';

const CustomCheckbox = ({ id, name }) => {
  const { filterState, dispatchFilter } = useContext(AppContext);

  const toggleGenre = () => {
    dispatchFilter({ type: 'TOGGLE-GENRE', payload: { id, name } });
  };

  return (
    <li className={styles.listItem}>
      <input
        type="checkbox"
        name="movie-genres"
        id={name}
        // checked={filterState.genres.includes(name)}
        onChange={toggleGenre}
      />
      <label htmlFor={name}>{name}</label>
    </li>
  );
};

export default CustomCheckbox;
