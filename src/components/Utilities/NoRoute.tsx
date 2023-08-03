import { Link } from 'react-router-dom';
import styles from './NoRoute.module.scss';

const NoRoute = () => {
  return (
    <div className={styles.noRoute}>
      <p>There's nothing here!</p>
      <Link to='/movies'>Back to home</Link>
    </div>
  );
};

export default NoRoute;
