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

  const [viewTrailer, setViewTrailer] = useState(false);
  const [viewGallery, setViewGallery] = useState(false);
  const media = movie;
  useDocumentTitle(`${media.title} (${media.release_date?.slice(0, 4)})`);

  const trailer = media.videos?.results?.find((entry) => {
    return (
      entry.type.toLowerCase() === 'trailer' &&
      entry.site.toLowerCase() === 'youtube'
    );
  });

  const hasImages = media?.images?.backdrops.length > 0;

  const handleViewGallery = () => {
    hasImages && setViewGallery(true);
  };

  return (
    <main className={styles.main}>
      <div className={styles.showcase}>
        <div
          className={styles.backdrop}
          style={{
            background: `url('${backdropBase}${media.backdrop_path}') no-repeat top center/cover`,
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
              src={`${posterBase}${media.poster_path}`}
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
                {media.title}
                {media.release_date && (
                  <span>({media.release_date.slice(0, 4)})</span>
                )}
              </h1>
            </div>
            {media.tagline && <p className={styles.tagline}>{media.tagline}</p>}
            <div className={styles.row}>
              <div className={styles.ratingAndRuntime}>
                <div
                  className={styles.voteCircle}
                  style={{
                    border: `3px solid ${
                      media.vote_average
                        ? colorPercentage(media.vote_average / 10)
                        : '#777'
                    }`,
                  }}
                >
                  <p>
                    {media.vote_average
                      ? media.vote_average.toFixed(1) * 10
                      : 'NR'}
                  </p>
                  <FiPercent className={styles.percentSymbol} />
                </div>
                {media.runtime ? (
                  <span className={`${styles.dot} ${styles.dot1}`}></span>
                ) : (
                  ''
                )}
                {media.runtime ? (
                  <p className={styles.runtime}>
                    {formatRuntime(media.runtime)}
                  </p>
                ) : (
                  ''
                )}
              </div>
              {media.genres?.length > 0 && (
                <span className={`${styles.dot} ${styles.dot2}`}></span>
              )}
              <ul className={styles.genres}>
                {media.genres?.map(
                  (genre, idx) =>
                    idx < 3 && (
                      <li key={`${genre.name}-${genre.id}`}>
                        {genre.name}
                        {idx === media.genres.length - 1 || idx === 2
                          ? null
                          : ','}
                      </li>
                    )
                )}
              </ul>
            </div>
            {media.overview && (
              <div className={styles.overview}>
                <h3>Overview</h3>
                <p>{media.overview}</p>
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
