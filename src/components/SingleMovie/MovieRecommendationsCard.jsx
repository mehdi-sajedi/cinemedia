import React from 'react';
import { Link } from 'react-router-dom';
import styles from './MovieRecommendationsCard.module.scss';

const basePath = 'https://image.tmdb.org/t/p/w780';

const MovieRecommendationsCard = ({ title, backdrop_path, id }) => {
  return (
    <Link className={styles.card} to={`/movies/${id}`}>
      <img src={`${basePath}${backdrop_path}`} alt="" />
      <div className={styles.text}>
        <h5 className={styles.actor}>{title}</h5>
      </div>
    </Link>
  );
};

export default MovieRecommendationsCard;
