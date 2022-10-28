import WatchlistGrid from '../components/Watchlist/WatchlistGrid';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

const Watchlist = () => {
  useDocumentTitle('My Watchlist');

  return <WatchlistGrid />;
};

export default Watchlist;
