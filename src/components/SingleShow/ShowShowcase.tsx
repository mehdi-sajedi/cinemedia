import { useState, useEffect } from 'react';
import { useAppSelector } from '../../hooks';
import styles from './ShowShowcase.module.scss';
import ShowTrailer from './ShowTrailer';
import ShowGallery from './ShowGallery';
import { BsPlay, BsBookmark } from 'react-icons/bs';
import { HiOutlineArrowsExpand } from 'react-icons/hi';
import { FiPercent } from 'react-icons/fi';
import { colorPercentage } from '../../utilities/utilities';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { onValue, ref, update } from 'firebase/database';
import { db } from '../../config/firebase';
import { Tooltip } from '@mui/material';
import { ClickAwayListener } from '@mui/material';
import { imageBase } from '../../data/imagePaths';
import { Watchlist } from '../../config/firebaseTypes';

const ShowShowcase = () => {
  const [viewTrailer, setViewTrailer] = useState(false);
  const [viewGallery, setViewGallery] = useState(false);
  const [inWatchlist, setInWatchlist] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const { show } = useAppSelector((state) => state.show);
  const { id } = useAppSelector((state) => state.user);
  useDocumentTitle(`${show?.name} (${show?.first_air_date?.slice(0, 4)})`);

  useEffect(() => {
    if (!id) return;

    const watchlistRef = ref(db, `watchlist/${id}`);
    const unsubscribe = onValue(watchlistRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const dataArr: Watchlist = Object.values(data);
        const isSaved = dataArr.some(
          (media) => media.id === show?.id && media.type === 'show'
        );
        setInWatchlist(isSaved);
      } else {
        setInWatchlist(false);
      }
    });

    return () => unsubscribe();
  }, [id, show?.id]);

  const trailer = show?.videos?.results?.find((entry) => {
    return (
      entry.type.toLowerCase() === 'trailer' &&
      entry.site.toLowerCase() === 'youtube'
    );
  });

  const hasImages = show?.images.backdrops && show.images.backdrops.length > 0;

  const handleViewGallery = () => {
    hasImages && setViewGallery(true);
  };

  const toggleWatchlist = () => {
    // User not logged in
    if (!id) {
      setShowTooltip(true);
      return;
    }

    const key = `watchlist/${id}/${show?.id}S`;

    // Item already in Watchlist
    if (inWatchlist) {
      return update(ref(db), { [key]: {} });
    }

    // Item not in Watchlist
    const showData = {
      [key]: {
        id: show?.id,
        date: show?.first_air_date,
        rating: show?.vote_average,
        poster: show?.poster_path,
        name: show?.name,
        type: 'show',
        user: id,
      },
    };

    return update(ref(db), showData);
  };

  const formatLastAirDate = (date: string) => {
    if (show?.status !== 'Returning Series') {
      date = '-' + show?.last_air_date.slice(0, 4);
      if (show?.first_air_date.slice(0, 4) === show?.last_air_date.slice(0, 4))
        date = '';
    } else date = '-';

    return date;
  };

  return (
    <main className={styles.main}>
      <div className={styles.showcase}>
        <div
          className={styles.backdrop}
          style={{
            background: `url('${imageBase}original${show?.backdrop_path}') no-repeat top center/cover`,
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
              src={`${imageBase}w780${show?.poster_path}`}
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
                {show?.name}
                {show?.first_air_date && (
                  <span>
                    (
                    {show?.first_air_date.slice(0, 4) +
                      formatLastAirDate(show?.last_air_date)}
                    )
                  </span>
                )}
              </h1>
            </div>
            {show?.tagline && <p className={styles.tagline}>{show?.tagline}</p>}
            <div className={styles.row}>
              <div className={styles.ratingAndRuntime}>
                <div
                  className={styles.voteCircle}
                  style={{
                    border: `3px solid ${
                      show?.vote_average
                        ? colorPercentage(show?.vote_average / 10)
                        : '#777'
                    }`,
                  }}
                >
                  <p>
                    {show?.vote_average
                      ? +show.vote_average.toFixed(1) * 10
                      : 'NR'}
                  </p>
                  {show?.vote_average ? (
                    <FiPercent className={styles.percentSymbol} />
                  ) : null}
                </div>
              </div>
              {show?.genres && show.genres.length > 0 && (
                <span className={`${styles.dot} ${styles.dot2}`}></span>
              )}
              <ul className={styles.genres}>
                {show?.genres?.map(
                  (genre, idx) =>
                    idx < 3 && (
                      <li key={`${genre.name}-${genre.id}`}>
                        {genre.name}
                        {idx === show?.genres.length - 1 || idx === 2
                          ? null
                          : ','}
                      </li>
                    )
                )}
              </ul>
            </div>
            {show?.overview && (
              <div className={styles.overview}>
                <h3>Overview</h3>
                <p>{show?.overview}</p>
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
                        : 'Add to Watchlist'}
                    </span>
                  </button>
                </Tooltip>
              </ClickAwayListener>
              <button
                className={styles.viewGallery}
                onClick={handleViewGallery}
              >
                <HiOutlineArrowsExpand className={styles.icon} />
                <span>View Gallery</span>
              </button>
            </div>
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
