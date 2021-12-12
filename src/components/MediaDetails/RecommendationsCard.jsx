import React from 'react';
import { Link } from 'react-router-dom';
import styles from './RecommendationsCard.module.scss';

const basePath = 'https://image.tmdb.org/t/p/w780';

const RecommendationsCard = ({ name, image, character, id, media_type }) => {
  const mediaType = media_type === 'movie' ? 'movies' : 'shows';

  return (
    <Link className={styles.card} to={`/${mediaType}/${id}`}>
      <img src={`${basePath}${image}`} alt="" />
      <div className={styles.text}>
        <h5 className={styles.actor}>{name}</h5>
        <p>{character}</p>
      </div>
    </Link>
  );
};

export default RecommendationsCard;
