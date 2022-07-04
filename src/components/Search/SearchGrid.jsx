import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { getSearchResults } from '../../features/search/searchSlice';
import GridStyles from './SearchGrid.module.scss';
import MoviesCard from '../Movies/MoviesCard';
import ShowsCard from '../Shows/ShowsCard';
import Loading from '../Utilities/Loading';

const SearchGrid = () => {
  const dispatch = useDispatch();
  const { results, isLoading } = useSelector((state) => state.search);
  const [searchParams] = useSearchParams();
  useDocumentTitle('Search Results');

  const searchQuery = searchParams.get('query');

  useEffect(() => {
    dispatch(getSearchResults(searchQuery));
  }, [dispatch, searchQuery]);

  if (isLoading) return <Loading />;

  return (
    <section className={GridStyles.grid}>
      {results?.map((entry) => {
        return entry.media_type === 'movie' ? (
          <MoviesCard {...entry} key={`${entry.id}${entry.credit_id}`} />
        ) : (
          <ShowsCard {...entry} key={`${entry.id}${entry.credit_id}`} />
        );
      })}
    </section>
  );
};

export default React.memo(SearchGrid);
