import { useAppSelector } from '../../hooks';
import { Link } from 'react-router-dom';
import styles from './SearchResultsText.module.scss';

const SearchResultsText = () => {
  const { results, text, person } = useAppSelector((state) => state.search);

  return (
    <p className={styles.text}>
      Showing {results.length} results for{' '}
      {person ? (
        <Link to={`/person/${person.id}`}>{person.name}</Link>
      ) : (
        <span>"{text}"</span>
      )}
    </p>
  );
};

export default SearchResultsText;
