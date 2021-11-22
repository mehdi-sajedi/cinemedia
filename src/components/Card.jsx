import React from 'react';
import CardStyles from './Card.module.scss';
import { genres } from '../data/genres';

const basePath = 'https://image.tmdb.org/t/p/w500/';

const Card = ({
  poster_path: posterID,
  name: tvName,
  original_title: movieName,
  release_date: movieYear,
  first_air_date: tvYear,
  genre_ids,
  media_type,
}) => {
  return (
    // <h1>Success</h1>
    // <div className={CardStyles.card}>
    //   <img src={`${basePath}${posterID}`} alt="" />
    //   <div className={CardStyles.details}>
    //     <div className={CardStyles.topRow}>
    //       <h3>{movieName ? movieName : tvName}</h3>
    //       <h4>{movieYear ? movieYear.slice(0, 4) : tvYear.slice(0, 4)}</h4>
    //     </div>
    //     <h4 className={CardStyles.genre}>{genres.get(genre_ids[0])}</h4>
    //   </div>
    // </div>
    <>{posterID && <img src={`${basePath}${posterID}`} alt="" />}</>
  );
};

export default Card;
