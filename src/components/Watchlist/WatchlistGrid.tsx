import { useAppSelector } from '../../hooks';
import { useState, useEffect } from 'react';
import styles from './WatchlistGrid.module.scss';
import { onValue, ref } from 'firebase/database';
import { db } from '../../config/firebase';
import WatchlistCard from './WatchlistCard';
import { Watchlist } from '../../config/firebaseTypes';
import { Link } from 'react-router-dom';

const WatchlistGrid = () => {
  const [watchlist, setWatchlist] = useState<Watchlist>([]);
  const { id } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (id) {
      const watchlist = ref(db, `watchlist/${id}`);
      const unsubscribe = onValue(watchlist, (snapshot) => {
        const watchlistItems = snapshot.val();
        if (watchlistItems !== null) {
          const watchlistItemsArr: Watchlist = Object.values(watchlistItems);
          setWatchlist(watchlistItemsArr);
        } else setWatchlist(null);
      });

      return () => unsubscribe();
    }

    return;
  }, [id]);

  return (
    <div className={styles.watchlist}>
      <h1>My Watchlist</h1>

      {/* Not logged in */}
      {!id && (
        <p className={styles.emptyList}>
          <Link to='/auth'>Login</Link> to start adding items!
        </p>
      )}

      {/* Logged in but no items in watchlist */}
      {watchlist === null && (
        <p className={styles.emptyList}>
          Add movies or shows to your Watchlist to have them appear here!
        </p>
      )}

      {/* Logged in and has items in watchlist */}
      {watchlist && (
        <div className={styles.grid}>
          {watchlist.map((item) => (
            <WatchlistCard {...item} key={`${item.type}-${item.id}`} />
          ))}
        </div>
      )}
      
    </div>
  );
};

export default WatchlistGrid;
