import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { getSingleShow } from '../features/shows/showSlice';
import { useParams } from 'react-router-dom';
import styles from './SingleShow.module.scss';
import ShowShowcase from '../components/SingleShow/ShowShowcase';
import ShowCast from '../components/SingleShow/ShowCast';
import ShowSidebar from '../components/SingleShow/ShowSidebar';
import ShowRecommendations from '../components/SingleShow/ShowRecommendations';
import Loading from '../components/Utilities/Loading';
import Error from '../components/Utilities/Error';

const SingleShow = () => {
  const dispatch = useAppDispatch();
  const { show, isLoading, isError } = useAppSelector((state) => state.show);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getSingleShow(Number(id)));
  }, [dispatch, id]);

  if (isLoading) return <Loading />;
  if (isError) return <Error />;

  return (
    <>
      <ShowShowcase />
      <section className={styles.showDetails}>
        <ShowCast />
        <ShowSidebar />
      </section>
      {show.recommendations?.results.length > 0 && <ShowRecommendations />}
    </>
  );
};

export default SingleShow;
