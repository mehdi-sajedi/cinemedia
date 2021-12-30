import React from 'react';
import { Link } from 'react-router-dom';
import styles from './CastCard.module.scss';

const CastCard = ({ name, profile_path: image, character, id }) => {
  const sizes = ['w92', 'w342'];

  const imagePaths = [
    `https://image.tmdb.org/t/p/${sizes[0]}${image} ${sizes[0].slice(1) + 'w'}`,
    `https://image.tmdb.org/t/p/${sizes[1]}${image} ${sizes[1].slice(1) + 'w'}`,
  ];
  return (
    <Link className={styles.card} to={`/person/${id}`}>
      <img srcSet={imagePaths.join(`, `)} alt="" />
      <div className={styles.text}>
        <h5 className={styles.actor}>{name}</h5>
        <p>{character}</p>
      </div>
    </Link>
  );
};

export default CastCard;
