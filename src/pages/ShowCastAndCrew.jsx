import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getSingleShow } from '../features/shows/showSlice';
import { useParams } from 'react-router-dom';
import styles from './ShowCastAndCrew.module.scss';
import ToggleBtn from '../components/ShowCast/ToggleBtn';
import Loading from '../components/Utilities/Loading';
import Error from '../components/Utilities/Error';
import Banner from '../components/ShowCast/Banner';
import CreditsList from '../components/ShowCast/CreditsList';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

const ShowCastAndCrew = () => {
  const dispatch = useDispatch();
  const { show, isLoading, isError } = useSelector((state) => state.show);
  const { id } = useParams();
  useDocumentTitle(`${show.name} | Cast`);

  useEffect(() => {
    dispatch(getSingleShow(id));
  }, [dispatch, id]);

  if (isLoading) return <Loading />;
  if (isError) return <Error />;

  return (
    <div className={styles.showCastAndCrew}>
      <Banner />
      <div className={styles.content}>
        <ToggleBtn />
        <div className={styles.lists}>
          <CreditsList creditType="cast" work="roles" />
          <CreditsList creditType="crew" work="jobs" />
        </div>
      </div>
    </div>
  );
};

export default ShowCastAndCrew;
