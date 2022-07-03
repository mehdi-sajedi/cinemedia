import { Link } from 'react-router-dom';
import { formatDate } from '../Utilities/helpers';
import styles from './ShowsCard.module.scss';

const basePath = 'https://image.tmdb.org/t/p/w500/';

const ShowsCard = ({ poster_path: posterID, name, first_air_date, id }) => {
  return (
    <div className={styles.card}>
      <Link className={styles.imageWrapper} to={`/shows/${id}`}>
        <img src={`${basePath}${posterID}`} alt="" />
      </Link>
      <div className={styles.details}>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.release}>{formatDate(first_air_date, 'short')}</p>
      </div>
    </div>
  );
};

export default ShowsCard;
