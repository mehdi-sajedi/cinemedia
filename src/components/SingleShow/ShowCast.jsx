import styles from './ShowCast.module.scss';
import ShowCastCard from './ShowCastCard';
import { useSelector, useDispatch } from 'react-redux';
import { useRef, useLayoutEffect, useEffect } from 'react';
import {
  updateCastScroll,
  setPrevShowId,
} from '../../features/shows/showSlice';

const ShowCast = () => {
  const { show, castScroll, prevShowId } = useSelector((state) => state.show);
  const dispatch = useDispatch();
  const ref = useRef(null);

  const scrollEvent = (e) => {
    dispatch(updateCastScroll(e.target.scrollLeft));
  };

  useEffect(() => {
    dispatch(setPrevShowId(show.id));
    // eslint-disable-next-line
  }, [dispatch]);

  useLayoutEffect(() => {
    ref.current.scrollLeft = show.id === prevShowId ? castScroll : 0;
    // eslint-disable-next-line
  }, []);

  return (
    <div className={styles.cast}>
      <h2 className={styles.heading}>Cast</h2>
      <ul className={styles.castGrid} ref={ref} onScroll={scrollEvent}>
        {show.aggregate_credits?.cast.map((member, idx) => {
          return (
            member.profile_path &&
            idx < 20 && (
              <ShowCastCard
                {...member}
                key={`${member.id}-${member.popularity}`}
              />
            )
          );
        })}
      </ul>
    </div>
  );
};

export default ShowCast;
