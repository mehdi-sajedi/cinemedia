import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/app-context';
import styles from './Showcase.module.scss';
import Trailer from './Trailer';
import Gallery from './Gallery';
import { useLocation } from 'react-router';
import { BsFillPlayFill } from 'react-icons/bs';
import { HiOutlineArrowsExpand } from 'react-icons/hi';
import { FiPercent } from 'react-icons/fi';
import { formatRuntime, colorPercentage } from '../Utilities/helpers';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';

const backdropBase = 'https://image.tmdb.org/t/p/original/';
const posterBase = 'https://image.tmdb.org/t/p/w780/';

const Showcase = () => {
  const { appState, dispatch } = useContext(AppContext);
  const { pathname } = useLocation();
  const [showTrailer, setShowTrailer] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const media = appState.currentMedia;
  const mediaID = pathname.substring(pathname.lastIndexOf('/') + 1);
  useDocumentTitle(`${media.title} (${media.release_date?.slice(0, 4)})`);

  // useEffect(() => {
  //   document.title = `${media.title} (${media.release_date?.slice(0, 4)})`;
  // }, [media]);

  const trailer = media.videos?.results?.find((entry) => {
    return (
      entry.type.toLowerCase() === 'trailer' &&
      entry.site.toLowerCase() === 'youtube'
    );
  });

  const hasImages = media?.images?.backdrops.length > 0;

  const handleShowGallery = () => {
    hasImages && setShowGallery(true);
  };

  useEffect(() => {
    const getMediaDetails = async () => {
      const URL_SHOW = `https://api.themoviedb.org/3/tv/${mediaID}?api_key=${process.env.REACT_APP_API_KEY}&append_to_response=credits,external_ids,images,videos,reviews,recommendations`;
      const URL_MOVIE = `https://api.themoviedb.org/3/movie/${mediaID}?api_key=${process.env.REACT_APP_API_KEY}&append_to_response=credits,external_ids,images,videos,reviews,recommendations`;

      const mediaType = pathname.includes('movies') ? URL_MOVIE : URL_SHOW;
      const res = await fetch(mediaType);

      if (mediaType === URL_MOVIE) {
        let { recommendations, ...rest } = await res.json();
        console.log({ recommendations, ...rest });

        dispatch({
          type: 'SET-SINGLE-RESULT',
          payload: { recommendations: recommendations.results, ...rest },
        });
      }
      //
      else if (mediaType === URL_SHOW) {
        let {
          name: title,
          first_air_date: release_date,
          episode_run_time: runtime,
          recommendations,
          ...rest
        } = await res.json();
        // prettier-ignore
        console.log({ title, release_date, runtime,  recommendations, ...rest });

        dispatch({
          type: 'SET-SINGLE-RESULT',
          payload: {
            title,
            release_date,
            runtime: runtime[0],
            recommendations: recommendations.results,
            ...rest,
          },
        });
      }
    };
    getMediaDetails();
  }, [dispatch, mediaID, pathname]);

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
            onClick={handleShowGallery}
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
                onClick={() => setShowTrailer(true)}
                className={styles.trailerBtn}
              >
                <BsFillPlayFill />
                <span>Play Trailer</span>
              </button>
            )}
          </div>
        </div>
      </div>
      {showTrailer && (
        <Trailer trailer={trailer} setShowTrailer={setShowTrailer} />
      )}

      {showGallery && <Gallery setShowGallery={setShowGallery} />}
    </main>
  );
};

export default Showcase;
