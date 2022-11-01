import { Link } from 'react-router-dom';
import styles from './ShowRecommendationsCard.module.scss';
import { imageBase } from '../../data/imagePaths';

const ShowRecommendationsCard = ({ name, backdrop_path, id }) => {
  return (
    <Link className={styles.card} to={`/shows/${id}`}>
      <img src={`${imageBase}w500${backdrop_path}`} loading="lazy" alt="" />
      <div className={styles.text}>
        <h5>{name}</h5>
      </div>
    </Link>
  );
};

export default ShowRecommendationsCard;
