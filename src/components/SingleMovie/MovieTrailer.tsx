import { useAppSelector } from '../../hooks';
import { createPortal } from 'react-dom';
import styles from './MovieTrailer.module.scss';
import { SingleMovie } from '../../features/movies/movieTypes';

interface MovieTrailerProps {
  trailer?: SingleMovie['videos']['results'][0];
  setViewTrailer: React.Dispatch<React.SetStateAction<boolean>>;
}

const MovieTrailer = ({ setViewTrailer, trailer }: MovieTrailerProps) => {
  const { movie } = useAppSelector((state) => state.movie);

  return createPortal(
    <div className={styles.wrapper} onClick={() => setViewTrailer(false)}>
      <iframe
        src={`https://www.youtube.com/embed/${trailer?.key}?autoplay=0&origin=localhost:3000`}
        className={styles.trailer}
        allowFullScreen={true}
        title={movie?.title}
      ></iframe>
    </div>,
    document.getElementById('trailerModal')!
  );
};

export default MovieTrailer;
