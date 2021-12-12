import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './RecommendationsCard.module.scss';

const basePath = 'https://image.tmdb.org/t/p/original';

const RecommendationsCard = ({ name, backdrop_path, id, media_type }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const mediaType = media_type === 'movie' ? 'movies' : 'shows';

  return (
    <Link className={styles.card} to={`/${mediaType}/${id}`}>
      <img src={`${basePath}${backdrop_path}`} alt="" />
      <div className={styles.text}>
        <h5 className={styles.actor}>{name}</h5>
      </div>
    </Link>
  );
};

export default RecommendationsCard;
