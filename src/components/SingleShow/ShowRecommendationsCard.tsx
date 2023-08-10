import styles from './ShowRecommendationsCard.module.scss';
import { Link } from 'react-router-dom';
import { imageBase } from '../../data/imagePaths';

interface ShowRecommendationsCardProps {
  name: string;
  backdrop_path: string;
  id: number;
}

const ShowRecommendationsCard = ({
  name,
  backdrop_path,
  id,
}: ShowRecommendationsCardProps) => {
  return (
    <li className={styles.card}>
      <Link to={`/shows/${id}`}>
        <img src={`${imageBase}w780${backdrop_path}`} loading="lazy" alt="" />
      </Link>
      <div className={styles.text}>
        <h3>{name}</h3>
      </div>
    </li>
  );
};

export default ShowRecommendationsCard;
