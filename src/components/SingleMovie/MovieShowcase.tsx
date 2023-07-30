import { useState, useEffect } from 'react';
import { useAppSelector } from '../../hooks';
import styles from './MovieShowcase.module.scss';
import MovieTrailer from './MovieTrailer';
import MovieGallery from './MovieGallery';
import { BsPlay, BsBookmark } from 'react-icons/bs';
import { HiOutlineArrowsExpand } from 'react-icons/hi';
import { FiPercent } from 'react-icons/fi';
import { formatRuntime, colorPercentage } from '../../utilities/utilities';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { onValue, ref, update } from 'firebase/database';
import { db } from '../../config/firebase';
import { Tooltip } from '@mui/material';
import { ClickAwayListener } from '@mui/material';
import { imageBase } from '../../data/imagePaths';
import { Watchlist } from '../../config/firebaseTypes';

const MovieShowcase = () => {
  const [viewTrailer, setViewTrailer] = useState(false);
  const [viewGallery, setViewGallery] = useState(false);
  const [inWatchlist, setInWatchlist] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const { id } = useAppSelector((state) => state.user);
  const { movie } = useAppSelector((state) => state.movie);
  useDocumentTitle(`${movie?.title} (${movie?.release_date?.slice(0, 4)})`);

  useEffect(() => {
    if (!id) return;

    const watchlistRef = ref(db, `watchlist/${id}`);
    const unsubscribe = onValue(watchlistRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const dataArr: Watchlist = Object.values(data);
        const isSaved = dataArr.some(
          (media) => media.id === movie?.id && media.type === 'movie'
        );
        setInWatchlist(isSaved);
      } else {
        setInWatchlist(false);
      }
    });

    return () => unsubscribe();
  }, [id, movie?.id]);

  const trailer = movie?.videos?.results?.find((entry) => {
    return (
      entry.type.toLowerCase() === 'trailer' &&
      entry.site.toLowerCase() === 'youtube'
    );
  });

  const hasImages =
    movie?.images.backdrops && movie.images.backdrops.length > 0;

  const handleViewGallery = () => {
    hasImages && setViewGallery(true);
  };

  const toggleWatchlist = () => {
    // User not logged in
    if (!id) {
      setShowTooltip(true);
      return;
    }

    const key = `watchlist/${id}/${movie?.id}M`;

    // Item already in Watchlist
    if (inWatchlist) {
      return update(ref(db), { [key]: {} });
    }

    // Item not in Watchlist
    const movieData = {
      [key]: {
        id: movie?.id,
        date: movie?.release_date,
        rating: movie?.vote_average,
        poster: movie?.poster_path,
        name: movie?.title,
        type: 'movie',
        user: id,
      },
    };

    return update(ref(db), movieData);
  };

  return (
    <main className={styles.main}>
      <div
        className={`${styles.showcase} ${
          !movie?.backdrop_path ? styles.noBackdrop : ''
        }`}
      >
        <div
          className={styles.backdrop}
          style={{
            background: `url('${imageBase}original${movie?.backdrop_path}') no-repeat top center/cover`,
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
              src={`${imageBase}w780${movie?.poster_path}`}
              alt=''
            />
            <div className={styles.posterText}>
              <HiOutlineArrowsExpand className={styles.icon} />
              <span>View Gallery</span>
            </div>
          </div>
          <div className={styles.textContent}>
            <div className={styles.heading}>
              <h1>
                {movie?.title}
                {movie?.release_date && (
                  <span>({movie?.release_date.slice(0, 4)})</span>
                )}
              </h1>
            </div>
            {movie?.tagline && (
              <p className={styles.tagline}>{movie?.tagline}</p>
            )}
            <div className={styles.row}>
              <div className={styles.ratingAndRuntime}>
                <div
                  className={styles.voteCircle}
                  style={{
                    border: `3px solid ${
                      movie?.vote_average
                        ? colorPercentage(movie?.vote_average / 10)
                        : '#777'
                    }`,
                  }}
                >
                  <p>
                    {movie?.vote_average
                      ? +movie?.vote_average.toFixed(1) * 10
                      : 'NR'}
                  </p>
                  {movie?.vote_average ? (
                    <FiPercent className={styles.percentSymbol} />
                  ) : null}
                </div>
                {movie?.runtime ? <span className={styles.dot}></span> : ''}
                {movie?.runtime ? (
                  <p className={styles.runtime}>
                    {formatRuntime(movie?.runtime)}
                  </p>
                ) : (
                  ''
                )}
              </div>
              {movie?.genres && movie.genres.length > 0 && (
                <span className={`${styles.dot} ${styles.dot2}`}></span>
              )}
              <ul className={styles.genres}>
                {movie?.genres?.map(
                  (genre, idx) =>
                    idx < 3 && (
                      <li key={`${genre.name}-${genre.id}`}>
                        {genre.name}
                        {idx === movie?.genres.length - 1 || idx === 2
                          ? null
                          : ','}
                      </li>
                    )
                )}
              </ul>
            </div>
            {movie?.overview && (
              <div className={styles.overview}>
                <h3>Overview</h3>
                <p>{movie?.overview}</p>
              </div>
            )}
            <div className={styles.buttons}>
              {trailer && (
                <button
                  onClick={() => setViewTrailer(true)}
                  className={styles.trailerBtn}
                >
                  <BsPlay />
                  <span>Play Trailer</span>
                </button>
              )}
              <ClickAwayListener onClickAway={() => setShowTooltip(false)}>
                <Tooltip
                  title={
                    <span style={{ fontSize: '12px', letterSpacing: '0.5px' }}>
                      Please login to add to Watchlist
                    </span>
                  }
                  arrow
                  PopperProps={{
                    disablePortal: true,
                  }}
                  onClose={() => setShowTooltip(false)}
                  open={showTooltip}
                  disableFocusListener
                  disableHoverListener
                  disableTouchListener
                >
                  <button onClick={toggleWatchlist} className={styles.bookmark}>
                    <BsBookmark />
                    <span>
                      {inWatchlist
                        ? 'Remove from Watchlist'
                        : 'Add To Watchlist'}
                    </span>
                  </button>
                </Tooltip>
              </ClickAwayListener>
              {hasImages && (
                <button
                  className={styles.viewGallery}
                  onClick={handleViewGallery}
                >
                  <HiOutlineArrowsExpand className={styles.icon} />
                  <span>View Gallery</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      {viewTrailer && (
        <MovieTrailer trailer={trailer} setViewTrailer={setViewTrailer} />
      )}

      {viewGallery && <MovieGallery setViewGallery={setViewGallery} />}
    </main>
  );
};

export default MovieShowcase;
