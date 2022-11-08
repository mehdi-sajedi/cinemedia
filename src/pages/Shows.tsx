import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import ShowsGrid from '../components/Shows/ShowsGrid';
import ShowsPagination from '../components/Shows/ShowsPagination';
import ShowsFilterMenu from '../components/Shows/FilterMenu/ShowsFilterMenu';
import FilterBtn from '../components/Shows/FilterMenu/FilterBtn';
import Loading from '../components/Utilities/Loading';
import Error from '../components/Utilities/Error';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { getShows } from '../features/shows/showSlice';
import styles from './Shows.module.scss';

const Shows = () => {
  const dispatch = useAppDispatch();
  const { page, isLoading, isError } = useAppSelector((state) => state.show);
  useDocumentTitle('Popular Shows');

  useEffect(() => {
    dispatch(getShows());
  }, [dispatch, page]);

  if (isError) return <Error />;

  return (
    <>
      <FilterBtn />
      <>
        <div className={styles.row}>
          <ShowsFilterMenu />
          {isLoading ? <Loading /> : <ShowsGrid />}
        </div>
        <ShowsPagination />
      </>
    </>
  );
};

export default Shows;
