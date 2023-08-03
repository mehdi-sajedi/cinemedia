import React, { useEffect } from 'react';
import { useAppSelector } from '../../hooks';
import { createPortal } from 'react-dom';
import { isBrowser } from 'react-device-detect';
import styles from './MovieGallery.module.scss';
import './MovieGalleryExtra.scss';
import ImageGallery from 'react-image-gallery';
import { ReactImageGalleryItem } from 'react-image-gallery';
import { imageBase } from '../../data/imagePaths';
import { useKeyPress } from '../../hooks/useKeydownListener';

const imageGallery = document.getElementById('imageGallery') as HTMLElement;

interface MovieGalleryProps {
  setViewGallery: React.Dispatch<React.SetStateAction<boolean>>;
}

const MovieGallery = ({ setViewGallery }: MovieGalleryProps) => {
  const { movie } = useAppSelector((state) => state.movie);
  const escapePressed = useKeyPress('Escape');
  const sizes = ['780', '1280', ''];

  useEffect(() => {
    if (escapePressed) setViewGallery(false);
  }, [escapePressed, setViewGallery]);

  const images = movie?.images.backdrops.map((entry) => {
    return {
      original: `${imageBase}w780${entry.file_path}`,
      thumbnail: `${imageBase}w780${entry.file_path}`,
      originalWidth: 780,
      originalHeight: 439,
      sizes: '(max-width: 780px) 780px, (max-width: 1280px) 1280px',
      srcSet: sizes
        .map(
          (size, idx) =>
            `${imageBase}${idx < 2 ? 'w' : 'original'}${size}${
              entry.file_path
            } ${idx < 2 ? size : entry.width}w`
        )
        .join(', '),
      loading: 'lazy',
      thumbnailLoading: 'lazy',
      originalAlt: '',
      thumbnailAlt: '',
    } as ReactImageGalleryItem;
  })!;

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;

    if (
      target.classList.contains('image-gallery-swipe') ||
      target.classList.contains('wrapper') ||
      target.classList.contains('image-gallery-slide-wrapper')
    ) {
      setViewGallery(false);
    }
  };

  return createPortal(
    <div className={`${styles.wrapper} wrapper`} onClick={handleClick}>
      <ImageGallery
        slideInterval={2400}
        items={images}
        showFullscreenButton={isBrowser}
        showIndex={true}
      />
    </div>,
    imageGallery
  );
};

export default MovieGallery;
