import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { getPeople } from '../features/person/personSlice';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import PeopleGrid from '../components/People/PeopleGrid';
import PeoplePagination from '../components/People/PeoplePagination';
import Loading from '../components/Utilities/Loading';
import styles from './People.module.scss';

const People = () => {
  const dispatch = useAppDispatch();
  const { page, isLoading } = useAppSelector((state) => state.person);
  useDocumentTitle('Trending People');

  useEffect(() => {
    dispatch(getPeople());
  }, [dispatch, page]);

  if (isLoading) return <Loading />;

  return (
    <>
      <div className={styles.row}>
        <PeopleGrid />
      </div>
      <PeoplePagination />
    </>
  );
};

export default People;
