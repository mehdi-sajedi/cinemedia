import { useSelector } from 'react-redux';
import { createPortal } from 'react-dom';
import styles from './MovieTrailer.module.scss';

const MovieTrailer = ({ setViewTrailer, trailer }) => {
  const { movie } = useSelector((state) => state.movie);

  return createPortal(
    <div className={styles.wrapper} onClick={() => setViewTrailer(false)}>
      <iframe
        type="text/html"
        src={`https://www.youtube.com/embed/${trailer.key}?autoplay=0&origin=localhost:3000`}
        className={styles.trailer}
        allowFullScreen={true}
        title={movie.title}
      ></iframe>
    </div>,
    document.getElementById('trailerModal')
  );
};

export default MovieTrailer;
