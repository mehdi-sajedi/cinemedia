import { useSelector } from 'react-redux';
import { createPortal } from 'react-dom';
import { isBrowser } from 'react-device-detect';
import styles from './ShowGallery.module.scss';
import './ShowGalleryExtra.scss';
import ImageGallery from 'react-image-gallery';
import { IoCloseOutline } from 'react-icons/io5';
import { imageBase } from '../../data/imagePaths';

const ShowGallery = ({ setViewGallery }) => {
  const { show } = useSelector((state) => state.show);
  const sizes = ['780', '1280', ''];

  const images = show.images.backdrops.map((entry) => {
    return {
      original: `${imageBase}w780${entry.file_path}`,
      thumbnail: `${imageBase}w780${entry.file_path}`,
      srcSet: sizes.map(
        (size, idx) =>
          `${imageBase}${idx < 2 ? 'w' : 'original'}${size}${entry.file_path} ${
            idx < 2 ? size : entry.width
          }w`
      ),
      loading: 'lazy',
      thumbnailLoading: 'lazy',
    };
  });

  const handleClick = (e) => {
    if (
      e.target.classList.contains('image-gallery-swipe') ||
      e.target.classList.contains('wrapper') ||
      e.target.classList.contains('image-gallery-slide-wrapper') ||
      e.target.closest('.closeBtn')
    ) {
      setViewGallery(false);
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
      {isBrowser && (
        <IoCloseOutline className={`${styles.closeBtn} closeBtn`} />
      )}
    </div>,
    document.getElementById('imageGallery')
  );
};

export default ShowGallery;
