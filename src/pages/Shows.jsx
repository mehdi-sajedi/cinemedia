import { useEffect } from 'react';
import ShowsGrid from '../components/Shows/ShowsGrid';
import ShowsPagination from '../components/Shows/ShowsPagination';
import FilterMenu from '../components/Shows/FilterMenu/FilterMenu';
import FilterBtn from '../components/Shows/FilterMenu/FilterBtn';
import Loading from '../components/Utilities/Loading';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { useDispatch, useSelector } from 'react-redux';
import { getShows } from '../features/shows/showSlice';

const Shows = () => {
  const dispatch = useDispatch();
  const { page, isLoading } = useSelector((state) => state.show);
  useDocumentTitle('Popular Shows');

  useEffect(() => {
    dispatch(getShows(page));
  }, [dispatch, page]);

  return (
    <>
      <FilterBtn />
      <FilterMenu />
      {isLoading && <Loading />}
      {!isLoading && (
        <>
          <ShowsGrid />
          <ShowsPagination />
        </>
      )}
    </>
  );
};

export default Shows;
