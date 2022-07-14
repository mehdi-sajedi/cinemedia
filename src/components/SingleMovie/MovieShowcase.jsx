import React, { useState } from 'react';
import styles from './MovieShowcase.module.scss';
import Trailer from './MovieTrailer';
import Gallery from './MovieGallery';
import { BsFillPlayFill } from 'react-icons/bs';
import { HiOutlineArrowsExpand } from 'react-icons/hi';
import { FiPercent } from 'react-icons/fi';
import { formatRuntime, colorPercentage } from '../Utilities/helpers';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { useSelector } from 'react-redux';

const backdropBase = 'https://image.tmdb.org/t/p/original/';
const posterBase = 'https://image.tmdb.org/t/p/w780/';

const MovieShowcase = () => {
  const { movie } = useSelector((state) => state.movie);
  console.log(movie);

  const [viewTrailer, setViewTrailer] = useState(false);
  const [viewGallery, setViewGallery] = useState(false);
  useDocumentTitle(`${movie.title} (${movie.release_date?.slice(0, 4)})`);

  const trailer = movie.videos?.results?.find((entry) => {
    return (
      entry.type.toLowerCase() === 'trailer' &&
      entry.site.toLowerCase() === 'youtube'
    );
  });

  const hasImages = movie?.images?.backdrops.length > 0;

  const handleViewGallery = () => {
    hasImages && setViewGallery(true);
  };

  return (
    <main className={styles.main}>
      <div className={styles.showcase}>
        <div
          className={styles.backdrop}
          style={{
            background: `url('${backdropBase}${movie.backdrop_path}') no-repeat top center/cover`,
          }}
        ></div>
        <div className={styles.content}>
          <div
            className={`${styles.posterWrap} ${
              hasImages ? styles.posterHover : ''
            }`}
            onClick={handleViewGallery}
          >
            <img
              className={styles.poster}
              src={`${posterBase}${movie.poster_path}`}
              alt=""
            />
            <div className={styles.posterText}>
              <HiOutlineArrowsExpand className={styles.icon} />
              <span>View Gallery</span>
            </div>
          </div>
          <div className={styles.textContent}>
            <div className={styles.heading}>
              <h1>
                {movie.title}
                {movie.release_date && (
                  <span>({movie.release_date.slice(0, 4)})</span>
                )}
              </h1>
            </div>
            {movie.tagline && <p className={styles.tagline}>{movie.tagline}</p>}
            <div className={styles.row}>
              <div className={styles.ratingAndRuntime}>
                <div
                  className={styles.voteCircle}
                  style={{
                    border: `3px solid ${
                      movie.vote_average
                        ? colorPercentage(movie.vote_average / 10)
                        : '#777'
                    }`,
                  }}
                >
                  <p>
                    {movie.vote_average
                      ? movie.vote_average.toFixed(1) * 10
                      : 'NR'}
                  </p>
                  {movie.vote_average ? (
                    <FiPercent className={styles.percentSymbol} />
                  ) : null}
                </div>
                {movie.runtime ? (
                  <span className={`${styles.dot} ${styles.dot1}`}></span>
                ) : (
                  ''
                )}
                {movie.runtime ? (
                  <p className={styles.runtime}>
                    {formatRuntime(movie.runtime)}
                  </p>
                ) : (
                  ''
                )}
              </div>
              {movie.genres?.length > 0 && (
                <span className={`${styles.dot} ${styles.dot2}`}></span>
              )}
              <ul className={styles.genres}>
                {movie.genres?.map(
                  (genre, idx) =>
                    idx < 3 && (
                      <li key={`${genre.name}-${genre.id}`}>
                        {genre.name}
                        {idx === movie.genres.length - 1 || idx === 2
                          ? null
                          : ','}
                      </li>
                    )
                )}
              </ul>
            </div>
            {movie.overview && (
              <div className={styles.overview}>
                <h3>Overview</h3>
                <p>{movie.overview}</p>
              </div>
            )}
            {trailer && (
              <button
                onClick={() => setViewTrailer(true)}
                className={styles.trailerBtn}
              >
                <BsFillPlayFill />
                <span>Play Trailer</span>
              </button>
            )}
          </div>
        </div>
      </div>
      {viewTrailer && (
        <Trailer trailer={trailer} setViewTrailer={setViewTrailer} />
      )}

      {viewGallery && <Gallery setViewGallery={setViewGallery} />}
    </main>
  );
};

export default MovieShowcase;
