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
  const { dispatch } = useContext(AppContext);
  const { pathname } = useLocation();

  const pathnameCopy =
    pathname === '/search' ? (tvYear ? '/shows' : '/movies') : pathname;

  const URL_SHOW_SINGLE = `https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.REACT_APP_API_KEY}`;

  const URL_MOVIE_SINGLE = `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}`;

  const getMediaDetails = async () => {
    const media =
      pathnameCopy === '/movies' ? URL_MOVIE_SINGLE : URL_SHOW_SINGLE;
    const res = await fetch(media);

    if (media === URL_MOVIE_SINGLE) {
      const data = await res.json();
      dispatch({
        type: 'SET-SINGLE-RESULT',
        payload: data,
      });
    } else if (media === URL_SHOW_SINGLE) {
      const {
        name: title,
        first_air_date: release_date,
        episode_run_time: runtime,
        ...rest
      } = await res.json();

      dispatch({
        type: 'SET-SINGLE-RESULT',
        payload: {
          title,
          release_date,
          runtime: runtime[0],
          ...rest,
        },
      });
    }
  };

  return (
    <Link to={`${pathnameCopy}/${id}`} onClick={getMediaDetails}>
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
