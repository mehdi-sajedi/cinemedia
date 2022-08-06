import { Link } from 'react-router-dom';
import styles from './ShowsCard.module.scss';
import { FiPercent } from 'react-icons/fi';
import { formatDate, colorPercentage } from '../../utilities/utilities';

const basePath = 'https://image.tmdb.org/t/p/w500/';

const ShowsCard = ({
  poster_path: posterID,
  name,
  first_air_date,
  id,
  vote_average,
}) => {
  return (
    <div className={styles.card}>
      <Link className={styles.imageWrapper} to={`/shows/${id}`}>
        <img src={`${basePath}${posterID}`} loading="lazy" alt="" />
      </Link>
      <div className={styles.details}>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.release}>
          {formatDate(first_air_date?.replace(/-/g, '/'), 'short')}
        </p>
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

export default ShowsCard;
