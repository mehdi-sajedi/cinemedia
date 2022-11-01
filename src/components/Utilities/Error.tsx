import { Link } from 'react-router-dom';
import styles from './Error.module.scss';

const Error = () => {
  return (
    <main className={styles.error}>
      <p>Something went wrong...</p>
      <Link to="/movies">Back to home</Link>
    </main>
  );
};

export default Error;
