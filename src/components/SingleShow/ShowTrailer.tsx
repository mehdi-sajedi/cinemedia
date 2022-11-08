import { useAppSelector } from '../../hooks';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './ShowTrailer.module.scss';
import { SingleShow } from '../../features/shows/showTypes';
import { useKeyPress } from '../../hooks/useKeydownListener';

const trailerModal = document.getElementById('trailerModal') as HTMLElement;

interface ShowTrailerProps {
  trailer?: SingleShow['videos']['results'][0];
  setViewTrailer: React.Dispatch<React.SetStateAction<boolean>>;
}

const ShowTrailer = ({ setViewTrailer, trailer }: ShowTrailerProps) => {
  const { show } = useAppSelector((state) => state.show);
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
        title={show?.name}
      ></iframe>
    </div>,
    trailerModal
  );
};

export default ShowTrailer;
