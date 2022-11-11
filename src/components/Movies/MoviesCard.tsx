import { Link } from 'react-router-dom';
import styles from './MoviesCard.module.scss';
import { FiPercent } from 'react-icons/fi';
import { formatDate, colorPercentage } from '../../utilities/utilities';
import { imageBase } from '../../data/imagePaths';

interface MoviesCardProps {
  poster_path: string;
  title: string;
  release_date: string;
  id: number;
  vote_average: number;
}

const MoviesCard = ({
  poster_path,
  title,
  release_date,
  id,
  vote_average,
}: MoviesCardProps) => {
  return (
    <div className={styles.card}>
      <Link className={styles.imageWrapper} to={`/movies/${id}`}>
        <img src={`${imageBase}w500${poster_path}`} loading="lazy" alt="" />
      </Link>
      <div className={styles.details}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.release}>
          {release_date
            ? formatDate(release_date.replace(/-/g, '/'), 'short')
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

export default MoviesCard;
