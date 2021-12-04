import React, { useContext } from 'react';
import { AppContext } from '../../context/app-context';
import { Link } from 'react-router-dom';
import styles from './SearchResultsText.module.scss';

const SearchResultsText = () => {
  const { appState, getActorDetails } = useContext(AppContext);

  const URL_PERSON = `https://api.themoviedb.org/3/person/${appState.search.id}?api_key=${process.env.REACT_APP_API_KEY}`;

  return (
    <p className={styles.text}>
      Showing results for{' '}
      {appState.search.person ? (
        <Link
          onClick={() => getActorDetails(URL_PERSON)}
          to={`/person/${appState.search.id}`}
        >
          {appState.search.personFullName}
        </Link>
      ) : (
        <span>"{appState.search.input}"</span>
      )}
    </p>
  );
};

export default SearchResultsText;
