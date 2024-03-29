import { useAppSelector } from '../../hooks';
import { Link } from 'react-router-dom';
import styles from './WatchlistCard.module.scss';
import { FiPercent } from 'react-icons/fi';
import { BsBookmarkFill } from 'react-icons/bs';
import { formatDate, colorPercentage } from '../../utilities/utilities';
import { ref, update } from 'firebase/database';
import { db } from '../../config/firebase';
import { imageBase } from '../../data/imagePaths';

interface WatchlistCardProps {
  poster: string;
  name: string;
  date: string;
  id: number;
  rating: number;
  type: string;
}

const WatchlistCard = ({
  poster,
  name,
  date,
  id,
  rating,
  type,
}: WatchlistCardProps) => {
  const { id: userId } = useAppSelector((state) => state.user);

  const deleteItem = () => {
    const mediaType = type === 'movie' ? 'M' : 'S';

    const key = `watchlist/${userId}/${id}${mediaType}`;
    return update(ref(db), { [key]: {} });
  };

  return (
    <div className={styles.card}>
      <Link className={styles.imageWrapper} to={`/${type}s/${id}`}>
        <img src={`${imageBase}w500${poster}`} loading='lazy' alt={name} />
      </Link>
      <div className={styles.details}>
        <h2 className={styles.name}>{name}</h2>
        <p className={styles.release}>
          {formatDate(date?.replace(/-/g, '/'), 'short')}
        </p>
        <div
          className={styles.voteCircle}
          style={{
            border: `3px solid ${
              rating ? colorPercentage(rating / 10) : '#777'
            }`,
          }}
        >
          <p>{rating ? +rating.toFixed(1) * 10 : 'NR'}</p>
          {rating ? <FiPercent className={styles.percentSymbol} /> : null}
        </div>
        <button
          onClick={deleteItem}
          className={styles.delete}
          title='Remove from watchlist'
        >
          <BsBookmarkFill />
        </button>
      </div>
    </div>
  );
};

export default WatchlistCard;
