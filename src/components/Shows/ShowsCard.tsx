import { Link } from 'react-router-dom';
import styles from './ShowsCard.module.scss';
import { FiPercent } from 'react-icons/fi';
import { formatDate, colorPercentage } from '../../utilities/utilities';
import { imageBase } from '../../data/imagePaths';

interface ShowsCardProps {
  poster_path: string;
  name: string;
  first_air_date: string;
  id: number;
  vote_average: number;
}

const ShowsCard = ({
  poster_path,
  name,
  first_air_date,
  id,
  vote_average,
}: ShowsCardProps) => {
  return (
    <div className={styles.card}>
      <Link className={styles.imageWrapper} to={`/shows/${id}`}>
        <img src={`${imageBase}w500${poster_path}`} loading='lazy' alt={name} />
      </Link>
      <div className={styles.details}>
        <h2 className={styles.name}>{name}</h2>
        <p className={styles.release}>
          {first_air_date
            ? formatDate(first_air_date.replace(/-/g, '/'), 'short')
            : ''}
        </p>
        <div
          className={styles.voteCircle}
          style={{
            border: `3px solid ${
              vote_average ? colorPercentage(vote_average / 10) : '#777'
            }`,
          }}
        >
          <p>{vote_average ? +vote_average.toFixed(1) * 10 : 'NR'}</p>
          {vote_average ? <FiPercent className={styles.percentSymbol} /> : null}
        </div>
      </div>
    </div>
  );
};

export default ShowsCard;
