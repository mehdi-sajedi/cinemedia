import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { getSearchResults } from '../features/search/searchSlice';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import SearchResultsText from '../components/Search/SearchResultsText';
import SearchGrid from '../components/Search/SearchGrid';
import Loading from '../components/Utilities/Loading';

const Search = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.search);
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('query');
  useDocumentTitle('Search Results');

  useEffect(() => {
    dispatch(getSearchResults(searchQuery));
  }, [dispatch, searchQuery]);

  if (isLoading) return <Loading />;

  return (
    <>
      <SearchResultsText />
      <SearchGrid />
    </>
  );
};

export default Search;
