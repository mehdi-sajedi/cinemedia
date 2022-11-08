import { useAppSelector } from '../../hooks';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './MovieTrailer.module.scss';
import { SingleMovie } from '../../features/movies/movieTypes';
import { useKeyPress } from '../../hooks/useKeydownListener';

const trailerModal = document.getElementById('trailerModal') as HTMLElement;

interface MovieTrailerProps {
  trailer?: SingleMovie['videos']['results'][0];
  setViewTrailer: React.Dispatch<React.SetStateAction<boolean>>;
}

const MovieTrailer = ({ setViewTrailer, trailer }: MovieTrailerProps) => {
  const { movie } = useAppSelector((state) => state.movie);
  const escapePressed = useKeyPress('Escape');

  useEffect(() => {
    if (escapePressed) setViewTrailer(false);
  }, [escapePressed, setViewTrailer]);

  return createPortal(
    <div className={styles.wrapper} onClick={() => setViewTrailer(false)}>
      <iframe
        src={`https://www.youtube.com/embed/${trailer?.key}?autoplay=0`}
        className={styles.trailer}
        allowFullScreen={true}
        title={movie?.title}
      ></iframe>
    </div>,
    trailerModal
  );
};

export default MovieTrailer;
