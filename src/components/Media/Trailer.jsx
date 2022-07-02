import { useSelector } from 'react-redux';
import { createPortal } from 'react-dom';
import styles from './Trailer.module.scss';

const Trailer = ({ setShowTrailer, trailer }) => {
  const { singleMovie } = useSelector((state) => state.movie);

  return createPortal(
    <div className={styles.wrapper} onClick={() => setShowTrailer(false)}>
      <iframe
        type="text/html"
        src={`https://www.youtube.com/embed/${trailer.key}?autoplay=0&origin=localhost:3000`}
        className={styles.trailer}
        allowFullScreen={true}
        title={singleMovie.title}
      ></iframe>
    </div>,
    document.getElementById('trailerModal')
  );
};

export default Trailer;
