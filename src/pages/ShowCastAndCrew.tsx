import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
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
  const dispatch = useAppDispatch();
  const { show, isLoading, isError } = useAppSelector((state) => state.show);
  const { id } = useParams();
  useDocumentTitle(`${show?.name} | Cast`);

  useEffect(() => {
    dispatch(getSingleShow(Number(id)));
  }, [dispatch, id]);

  if (isLoading) return <Loading />;
  if (isError) return <Error />;

  return (
    <div className={styles.showCastAndCrew}>
      <Banner />
      <div className={styles.content}>
        <ToggleBtn />
        <div className={styles.lists}>
          <CreditsList
            credits={show?.aggregate_credits.cast}
            creditType="Cast"
          />
          <CreditsList
            credits={show?.aggregate_credits.crew}
            creditType="Crew"
          />
        </div>
      </div>
    </div>
  );
};

export default ShowCastAndCrew;
