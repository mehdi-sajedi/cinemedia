import React, { useContext } from 'react';
import { AppContext } from '../../context/app-context';
import { Link } from 'react-router-dom';
import styles from './SearchResultsText.module.scss';

const SearchResultsText = () => {
  const { appState } = useContext(AppContext);

  return (
    <p className={styles.text}>
      Showing results for{' '}
      {appState.search.person ? (
        <Link to={`/person/${appState.search.id}`}>
          {appState.search.personFullName}
        </Link>
      ) : (
        <span>"{appState.search.query}"</span>
      )}
    </p>
  );
};

export default SearchResultsText;
