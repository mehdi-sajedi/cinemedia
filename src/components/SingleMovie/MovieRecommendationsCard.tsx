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
    <li className={styles.card}>
      <Link to={`/movies/${id}`}>
        <img src={`${imageBase}w780${backdrop_path}`} loading="lazy" alt="" />
      </Link>
      <div className={styles.text}>
        <h3>{title}</h3>
      </div>
    </li>
  );
};

export default MovieRecommendationsCard;
