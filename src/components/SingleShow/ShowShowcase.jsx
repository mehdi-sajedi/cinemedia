import React, { useState } from 'react';
import styles from './ShowShowcase.module.scss';
import ShowTrailer from './ShowTrailer';
import ShowGallery from './ShowGallery';
import { BsFillPlayFill } from 'react-icons/bs';
import { HiOutlineArrowsExpand } from 'react-icons/hi';
import { FiPercent } from 'react-icons/fi';
import { formatRuntime, colorPercentage } from '../../utilities/utilities';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { useSelector } from 'react-redux';

const backdropBase = 'https://image.tmdb.org/t/p/original/';
const posterBase = 'https://image.tmdb.org/t/p/w780/';

const ShowShowcase = () => {
  const { show } = useSelector((state) => state.show);

  const [viewTrailer, setViewTrailer] = useState(false);
  const [viewGallery, setViewGallery] = useState(false);
  useDocumentTitle(`${show.name} (${show.first_air_date?.slice(0, 4)})`);

  const trailer = show.videos?.results?.find((entry) => {
    return (
      entry.type.toLowerCase() === 'trailer' &&
      entry.site.toLowerCase() === 'youtube'
    );
  });

  const hasImages = show?.images?.backdrops.length > 0;

  const handleViewGallery = () => {
    hasImages && setViewGallery(true);
  };

  return (
    <main className={styles.main}>
      <div className={styles.showcase}>
        <div
          className={styles.backdrop}
          style={{
            background: `url('${backdropBase}${show.backdrop_path}') no-repeat top center/cover`,
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
              src={`${posterBase}${show.poster_path}`}
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
                {show.name}
                {show.first_air_date && (
                  <span>({show.first_air_date.slice(0, 4)})</span>
                )}
              </h1>
            </div>
            {show.tagline && <p className={styles.tagline}>{show.tagline}</p>}
            <div className={styles.row}>
              <div className={styles.ratingAndRuntime}>
                <div
                  className={styles.voteCircle}
                  style={{
                    border: `3px solid ${
                      show.vote_average
                        ? colorPercentage(show.vote_average / 10)
                        : '#777'
                    }`,
                  }}
                >
                  <p>
                    {show.vote_average
                      ? show.vote_average.toFixed(1) * 10
                      : 'NR'}
                  </p>
                  {show.vote_average ? (
                    <FiPercent className={styles.percentSymbol} />
                  ) : null}
                </div>
                {show.runtime ? (
                  <span className={`${styles.dot} ${styles.dot1}`}></span>
                ) : (
                  ''
                )}
                {show.runtime ? (
                  <p className={styles.runtime}>
                    {formatRuntime(show.runtime)}
                  </p>
                ) : (
                  ''
                )}
              </div>
              {show.genres?.length > 0 && (
                <span className={`${styles.dot} ${styles.dot2}`}></span>
              )}
              <ul className={styles.genres}>
                {show.genres?.map(
                  (genre, idx) =>
                    idx < 3 && (
                      <li key={`${genre.name}-${genre.id}`}>
                        {genre.name}
                        {idx === show.genres.length - 1 || idx === 2
                          ? null
                          : ','}
                      </li>
                    )
                )}
              </ul>
            </div>
            {show.overview && (
              <div className={styles.overview}>
                <h3>Overview</h3>
                <p>{show.overview}</p>
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
        <ShowTrailer trailer={trailer} setViewTrailer={setViewTrailer} />
      )}

      {viewGallery && <ShowGallery setViewGallery={setViewGallery} />}
    </main>
  );
};

export default ShowShowcase;
