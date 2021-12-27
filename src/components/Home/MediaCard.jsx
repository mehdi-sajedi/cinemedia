import React from 'react';
import { Link } from 'react-router-dom';
import CardStyles from './MediaCard.module.scss';
import { formatDate } from '../Utilities/helpers';

const basePath = 'https://image.tmdb.org/t/p/w500/';

const Card = ({ poster_path: posterID, media, name, release_date, id }) => {
  const pathname = '/' + media;

  return (
    <div className={CardStyles.card}>
      <Link className={CardStyles.imageWrapper} to={`${pathname}/${id}`}>
        <img src={`${basePath}${posterID}`} alt="" />
      </Link>
      <div className={CardStyles.details}>
        <h3 className={CardStyles.name}>{name}</h3>
        <p className={CardStyles.release}>
          {formatDate(release_date, 'short')}
        </p>
      </div>
    </div>
  );
};

export default Card;
