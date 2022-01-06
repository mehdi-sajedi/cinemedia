import React from 'react';
import { Link } from 'react-router-dom';
import styles from './RecommendationsCard.module.scss';

const basePath = 'https://image.tmdb.org/t/p/w780';

const RecommendationsCard = ({
  title,
  name,
  backdrop_path,
  id,
  media_type,
}) => {
  const mediaType = media_type === 'movie' ? 'movies' : 'shows';

  return (
    <Link className={styles.card} to={`/${mediaType}/${id}`}>
      <img src={`${basePath}${backdrop_path}`} alt="" />
      <div className={styles.text}>
        {media_type === 'movie' && <h5 className={styles.actor}>{title}</h5>}
        {media_type === 'tv' && <h5 className={styles.actor}>{name}</h5>}
      </div>
    </Link>
  );
};

export default RecommendationsCard;
