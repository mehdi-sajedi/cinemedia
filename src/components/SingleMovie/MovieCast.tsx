import styles from './MovieCast.module.scss';
import MovieCastCard from './MovieCastCard';
import { useAppDispatch, useAppSelector } from '../../hooks';
import React, { useRef, useLayoutEffect, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TiArrowRight } from 'react-icons/ti';
import {
  updateCastScroll,
  setPrevMovieId,
} from '../../features/movies/movieSlice';

const MovieCast = () => {
  const dispatch = useAppDispatch();
  const { movie, castScroll, prevMovieId } = useAppSelector(
    (state) => state.movie
  );

  const ref = useRef<null | HTMLUListElement>(null);

  const scrollEvent = (e: React.UIEvent<HTMLUListElement>) => {
    dispatch(updateCastScroll(e.currentTarget.scrollLeft));
  };

  useEffect(() => {
    movie && dispatch(setPrevMovieId(movie?.id));
    // eslint-disable-next-line
  }, [dispatch]);

  useLayoutEffect(() => {
    if (ref.current) {
      ref.current.scrollLeft = movie?.id === prevMovieId ? castScroll : 0;
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div className={styles.cast}>
      <h2 className={styles.heading}>Cast</h2>
      <ul className={styles.castGrid} ref={ref} onScroll={scrollEvent}>
        {movie?.credits?.cast.map((member, idx) => {
          return (
            member.profile_path &&
            idx < 20 && (
              <MovieCastCard
                {...member}
                key={`${member.id}-${member.popularity}`}
              />
            )
          );
        })}
        <li className={styles.viewMore}>
          <Link to="cast">
            View More <TiArrowRight />
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default MovieCast;
