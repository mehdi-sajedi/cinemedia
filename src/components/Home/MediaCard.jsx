import React from 'react';
import { Link } from 'react-router-dom';
import CardStyles from './MediaCard.module.scss';
import { genres } from '../../data/genres';

const basePath = 'https://image.tmdb.org/t/p/w500/';

const Card = ({
  poster_path: posterID,
  media,
  name,
  release_date,
  genre_ids,
  id,
}) => {
  const pathname = '/' + media;

  return (
    <div className={CardStyles.card}>
      <Link className={CardStyles.imageWrapper} to={`${pathname}/${id}`}>
        <img src={`${basePath}${posterID}`} alt="" />
      </Link>
      <div className={CardStyles.details}>
        <div className={CardStyles.topRow}>
          <h3 className={CardStyles.name}>{name}</h3>
          <h4 className={CardStyles.release}>{release_date?.slice(0, 4)}</h4>
        </div>
        <h4 className={CardStyles.genre}>{genres.get(genre_ids[0])}</h4>
      </div>
    </div>
  );
};

export default Card;
