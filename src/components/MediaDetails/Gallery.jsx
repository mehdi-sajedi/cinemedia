import React from 'react';
import ImageGallery from 'react-image-gallery';
import { createPortal } from 'react-dom';
import styles from './Gallery.module.scss';
import useShowComponent from '../../hooks/useShowComponent';

const images = [
  {
    original: 'https://picsum.photos/id/1018/1000/600/',
    thumbnail: 'https://picsum.photos/id/1018/250/150/',
  },
  {
    original: 'https://picsum.photos/id/1015/1000/600/',
    thumbnail: 'https://picsum.photos/id/1015/250/150/',
  },
  {
    original: 'https://picsum.photos/id/1019/1000/600/',
    thumbnail: 'https://picsum.photos/id/1019/250/150/',
  },
];

const Gallery = ({ setShowGallery }) => {
  const { ref, showComponent, setShowComponent } = useShowComponent();

  const handleClick = (e) => {
    console.log(e.target);
    setShowGallery(false);
  };

  return createPortal(
    <div className={styles.wrapper} ref={ref} onClick={handleClick}>
      <ImageGallery items={images} className={styles.gallery} />
    </div>,
    document.getElementById('imageGallery')
  );
};

export default Gallery;
