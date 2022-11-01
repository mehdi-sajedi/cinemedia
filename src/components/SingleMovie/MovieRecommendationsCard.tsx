import styles from './MovieRecommendationsCard.module.scss';
import { Link } from 'react-router-dom';
import { imageBase } from '../../data/imagePaths';

interface MovieRecommendationsCardProps {
  title: string;
  backdrop_path: string;
  id: number;
}

const MovieRecommendationsCard = ({
  title,
  backdrop_path,
  id,
}: MovieRecommendationsCardProps) => {
  return (
    <Link className={styles.card} to={`/movies/${id}`}>
      <img src={`${imageBase}w780${backdrop_path}`} loading="lazy" alt="" />
      <div className={styles.text}>
        <h5 className={styles.actor}>{title}</h5>
      </div>
    </Link>
  );
};

export default MovieRecommendationsCard;
