import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './SearchResultsText.module.scss';

const SearchResultsText = () => {
  const { text, id, name } = useSelector((state) => state.search);

  return (
    <p className={styles.text}>
      Showing results for{' '}
      {name ? <Link to={`/person/${id}`}>{name}</Link> : <span>"{text}"</span>}
    </p>
  );
};

export default SearchResultsText;
