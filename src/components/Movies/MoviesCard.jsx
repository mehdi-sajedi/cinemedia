import { Link } from 'react-router-dom';
import { formatDate } from '../Utilities/helpers';
import styles from './MoviesCard.module.scss';

const basePath = 'https://image.tmdb.org/t/p/w500/';

const MoviesCard = ({ poster_path: posterID, title, release_date, id }) => {
  return (
    <div className={styles.card}>
      <Link className={styles.imageWrapper} to={`/movies/${id}`}>
        <img src={`${basePath}${posterID}`} alt="" />
      </Link>
      <div className={styles.details}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.release}>{formatDate(release_date, 'short')}</p>
      </div>
    </div>
  );
};

export default MoviesCard;
