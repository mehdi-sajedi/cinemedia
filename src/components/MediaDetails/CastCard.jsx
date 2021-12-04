import React from 'react';
import { Link } from 'react-router-dom';
import styles from './CastCard.module.scss';

const basePath = 'https://image.tmdb.org/t/p/w780';

const CastCard = ({ name, profile_path: image, character, id }) => {
  return (
    <Link className={styles.card} to={`/person/${id}`}>
      <img src={`${basePath}${image}`} alt="" />
      <div className={styles.text}>
        <h5 className={styles.actor}>{name}</h5>
        <p>{character}</p>
      </div>
    </Link>
  );
};

export default CastCard;
