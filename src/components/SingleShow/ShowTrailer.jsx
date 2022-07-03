import { useSelector } from 'react-redux';
import { createPortal } from 'react-dom';
import styles from './ShowTrailer.module.scss';

const ShowTrailer = ({ setViewTrailer, trailer }) => {
  const { show } = useSelector((state) => state.show);

  return createPortal(
    <div className={styles.wrapper} onClick={() => setViewTrailer(false)}>
      <iframe
        type="text/html"
        src={`https://www.youtube.com/embed/${trailer.key}?autoplay=0&origin=localhost:3000`}
        className={styles.trailer}
        allowFullScreen={true}
        title={show.title}
      ></iframe>
    </div>,
    document.getElementById('trailerModal')
  );
};

export default ShowTrailer;
