import { useState, useEffect } from 'react';
import styles from './WatchlistGrid.module.scss';
import { onValue, ref } from 'firebase/database';
import { db } from '../../config/firebase';
import { useSelector } from 'react-redux';
import WatchlistCard from './WatchlistCard';

const WatchlistGrid = () => {
  const [watchlist, setWatchlist] = useState({});
  const { id } = useSelector((state) => state.user);

  useEffect(() => {
    if (id) {
      const watchlist = ref(db, `watchlist/${id}`);
      const unsubscribe = onValue(watchlist, (snapshot) => {
        const data = snapshot.val();
        console.log(data);

        setWatchlist(data);
      });

      return () => unsubscribe();
    }
  }, [id]);

  return (
    <div className={styles.watchlist}>
      <h1>My Watchlist</h1>
      {!id && <p className={styles.emptyList}>Login to start adding items!</p>}
      {watchlist && (
        <div className={styles.grid}>
          {Object.values(watchlist).map((item) => (
            <WatchlistCard key={`${item.type}-${item.id}`} {...item} />
          ))}
        </div>
      )}
      {!watchlist && (
        <p className={styles.emptyList}>
          Add items to your Watchlist to have them appear here!
        </p>
      )}
    </div>
  );
};

export default WatchlistGrid;
