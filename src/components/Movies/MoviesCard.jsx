import { Link } from 'react-router-dom';
import { formatDate } from '../Utilities/helpers';
import styles from './MoviesCard.module.scss';
import { colorPercentage } from '../Utilities/helpers';
import { FiPercent } from 'react-icons/fi';

const basePath = 'https://image.tmdb.org/t/p/w500/';

const MoviesCard = ({
  poster_path: posterID,
  title,
  release_date,
  id,
  vote_average,
}) => {
  return (
    <div className={styles.card}>
      <Link className={styles.imageWrapper} to={`/movies/${id}`}>
        <img src={`${basePath}${posterID}`} alt="" />
      </Link>
      <div className={styles.details}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.release}>{formatDate(release_date, 'short')}</p>
        <div
          className={styles.voteCircle}
          style={{
            border: `3px solid ${
              vote_average ? colorPercentage(vote_average / 10) : '#777'
            }`,
          }}
        >
          <p>{vote_average ? vote_average.toFixed(1) * 10 : 'NR'}</p>
          {vote_average ? <FiPercent className={styles.percentSymbol} /> : null}
        </div>
      </div>
    </div>
  );
};

export default MoviesCard;
