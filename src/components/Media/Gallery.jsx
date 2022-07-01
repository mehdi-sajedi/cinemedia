import React, { useContext } from 'react';
import { AppContext } from '../../context/app-context';
import ImageGallery from 'react-image-gallery';
import { createPortal } from 'react-dom';
import styles from './Gallery.module.scss';
import './GalleryExtra.scss';
import { isBrowser } from 'react-device-detect';

const backdropBase = 'https://image.tmdb.org/t/p';

const Gallery = ({ setShowGallery }) => {
  const { appState } = useContext(AppContext);
  const sizes = ['780', '1280', ''];

  const images = appState.currentMedia.images.backdrops.map((entry) => {
    return {
      original: `${backdropBase}/w780${entry.file_path}`,
      thumbnail: `${backdropBase}/w780${entry.file_path}`,
      srcSet: sizes.map(
        (size, idx) =>
          `${backdropBase}/${idx < 2 ? 'w' : 'original'}${size}${
            entry.file_path
          } ${idx < 2 ? size : entry.width}w`
      ),
      loading: 'lazy',
    };
  });

  const handleClick = (e) => {
    if (
      e.target.classList.contains('image-gallery-swipe') ||
      e.target.classList.contains('wrapper') ||
      e.target.classList.contains('image-gallery-slide-wrapper')
    ) {
      setShowGallery(false);
    }
  };

  return createPortal(
    <div className={`${styles.wrapper} wrapper`} onClick={handleClick}>
      <ImageGallery
        slideInterval={2400}
        items={images}
        className={styles.gallery}
        showFullscreenButton={isBrowser}
      />
    </div>,
    document.getElementById('imageGallery')
  );
};

export default Gallery;
