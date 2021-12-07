import React, { useContext } from 'react';
import { AppContext } from '../../context/app-context';
import ImageGallery from 'react-image-gallery';
import { createPortal } from 'react-dom';
import styles from './Gallery.module.scss';
import './GalleryExtra.scss';

const backdropBase = 'https://image.tmdb.org/t/p/w1280';
// const posterBase = 'https://image.tmdb.org/t/p/w780';

const Gallery = ({ setShowGallery }) => {
  const { appState } = useContext(AppContext);

  const images = appState.currentMedia.images.backdrops.map((entry) => {
    return {
      original: `${backdropBase}${entry.file_path}`,
      thumbnail: `${backdropBase}${entry.file_path}`,
    };
  });

  const handleClick = (e) => {
    console.log(e.target);
    if (
      e.target.classList.contains('image-gallery-swipe') ||
      e.target.classList.contains('wrapper')
    ) {
      setShowGallery(false);
    }
  };

  return createPortal(
    <div className={`${styles.wrapper} wrapper`} onClick={handleClick}>
      <ImageGallery showBullets items={images} className={styles.gallery} />
    </div>,
    document.getElementById('imageGallery')
  );
};

export default Gallery;
