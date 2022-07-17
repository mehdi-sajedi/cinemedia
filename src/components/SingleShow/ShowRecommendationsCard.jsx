import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ShowRecommendationsCard.module.scss';

const basePath = 'https://image.tmdb.org/t/p/w780';

const ShowRecommendationsCard = ({ name, backdrop_path, id, vote_average }) => {
  return (
    <Link className={styles.card} to={`/shows/${id}`}>
      <img src={`${basePath}${backdrop_path}`} alt="" />
      <div className={styles.text}>
        <h5>{name}</h5>
      </div>
      {/* <div className={styles.popup}>
        <p>Rating: {vote_average.toFixed(1)}</p>
      </div> */}
    </Link>
  );
};

export default ShowRecommendationsCard;
