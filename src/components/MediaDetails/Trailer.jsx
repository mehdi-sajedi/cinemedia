import React, { useContext } from 'react';
import { AppContext } from '../../context/app-context';
import { createPortal } from 'react-dom';
import styles from './Trailer.module.scss';

const Trailer = ({ setShowTrailer }) => {
  const { appState } = useContext(AppContext);

  const trailer = appState.currentMedia.videos.results.find((entry) => {
    return entry.type.toLowerCase() === 'trailer';
  });

  console.log(trailer);

  return createPortal(
    <div className={styles.wrapper} onClick={() => setShowTrailer(false)}>
      <iframe
        type="text/html"
        src={`//www.youtube.com/embed/${trailer.key}?autoplay=0&origin=http%3A%2F%2Fwww.themoviedb.org&hl=en&modestbranding=1&fs=1&autohide=1`}
        className={styles.trailer}
        allowFullScreen={true}
      ></iframe>
    </div>,
    document.getElementById('trailerModal')
  );
};

export default Trailer;
