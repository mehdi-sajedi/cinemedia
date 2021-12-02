import React, { useContext } from 'react';
import { AppContext } from '../context/app-context';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router';
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
  id,
}) => {
  const { appState, dispatch } = useContext(AppContext);
  const { pathname } = useLocation();

  const URL_SHOW = `https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.REACT_APP_API_KEY}`;

  const URL_MOVIE = `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}`;

  const doStuff = async () => {
    const media = pathname === '/movies' ? URL_MOVIE : URL_SHOW;

    const res = await fetch(media);
    const data = await res.json();
    dispatch({ type: 'SET-SINGLE-RESULT', payload: data });

    console.log(data);
  };

  return (
    <Link to={`${pathname}/${id}`} onClick={doStuff}>
      <div className={CardStyles.card}>
        <img src={`${basePath}${posterID}`} alt="" />
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
    </Link>
  );
};

export default Card;
