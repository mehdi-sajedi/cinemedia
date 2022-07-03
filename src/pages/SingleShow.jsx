import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getSingleShow } from '../features/shows/showSlice';
import { useLocation } from 'react-router';
import styles from './SingleShow.module.scss';
import ShowShowcase from '../components/SingleShow/ShowShowcase';
import ShowCast from '../components/SingleShow/ShowCast';
import ShowSidebar from '../components/SingleShow/ShowSidebar';
import ShowRecommendations from '../components/SingleShow/ShowRecommendations';

const SingleShow = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const mediaId = pathname.substring(pathname.lastIndexOf('/') + 1);

  useEffect(() => {
    dispatch(getSingleShow(mediaId));
  }, [dispatch, mediaId]);

  return (
    <>
      <ShowShowcase />
      <section className={styles.showDetails}>
        <ShowCast />
        <ShowSidebar />
      </section>
      <ShowRecommendations />
    </>
  );
};

export default SingleShow;
