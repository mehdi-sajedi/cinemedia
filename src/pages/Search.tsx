import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { useSearchParams } from 'react-router-dom';
import { getSearchResults } from '../features/search/searchSlice';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import SearchResultsText from '../components/Search/SearchResultsText';
import SearchGrid from '../components/Search/SearchGrid';
import Loading from '../components/Utilities/Loading';
import Error from '../components/Utilities/Error';

const Search = () => {
  const dispatch = useAppDispatch();
  const { isLoading, isError } = useAppSelector((state) => state.search);
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('query');
  useDocumentTitle('Search Results');

  useEffect(() => {
    if (searchQuery === null) return;
    dispatch(getSearchResults(searchQuery));
  }, [dispatch, searchQuery]);

  if (isLoading) return <Loading />;
  if (isError) return <Error />;

  return (
    <>
      <SearchResultsText />
      <SearchGrid />
    </>
  );
};

export default Search;
