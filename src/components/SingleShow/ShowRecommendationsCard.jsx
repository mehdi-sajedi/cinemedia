import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ShowRecommendationsCard.module.scss';

const basePath = 'https://image.tmdb.org/t/p/w780';

const ShowRecommendationsCard = ({
  name,
  backdrop_path,
  id,
  first_air_date,
}) => {
  return (
    <Link className={styles.card} to={`/shows/${id}`}>
      <img src={`${basePath}${backdrop_path}`} alt="" />
      <div className={styles.text}>
        <h5>
          {name} <span>({first_air_date.slice(0, 4)})</span>
        </h5>
      </div>
    </Link>
  );
};

export default ShowRecommendationsCard;
