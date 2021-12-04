import React from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router';
import CardStyles from './MediaCard.module.scss';
import { genres } from '../../data/genres';

const basePath = 'https://image.tmdb.org/t/p/w500/';

const Card = ({
  poster_path: posterID,
  name: tvName,
  title: movieName,
  release_date: movieYear,
  first_air_date: tvYear,
  genre_ids,
  id,
}) => {
  const { pathname } = useLocation();
  const pathnameCopy =
    pathname === '/search' ? (tvYear ? '/shows' : '/movies') : pathname;

  return (
    <div className={CardStyles.card}>
      <Link className={CardStyles.imageWrapper} to={`${pathnameCopy}/${id}`}>
        <img src={`${basePath}${posterID}`} alt="" />
      </Link>
      <div className={CardStyles.details}>
        <div className={CardStyles.topRow}>
          {movieName && <h3>{movieName}</h3>}
          {tvName && <h3>{tvName}</h3>}

          {movieYear && <h4>{movieYear.slice(0, 4)}</h4>}
          {tvYear && <h4>{tvYear.slice(0, 4)}</h4>}
        </div>
        <h4 className={CardStyles.genre}>{genres.get(genre_ids[0])}</h4>
      </div>
    </div>
  );
};

export default Card;
