import styles from './ShowCast.module.scss';
import ShowCastCard from './ShowCastCard';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useRef, useLayoutEffect, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TiArrowRight } from 'react-icons/ti';
import {
  updateCastScroll,
  setPrevShowId,
} from '../../features/shows/showSlice';

const ShowCast = () => {
  const dispatch = useAppDispatch();
  const { show, castScroll, prevShowId } = useAppSelector(
    (state) => state.show
  );
  const ref = useRef<null | HTMLUListElement>(null);

  const scrollEvent = (e: React.UIEvent<HTMLUListElement>) => {
    const target = e.target as HTMLUListElement;
    dispatch(updateCastScroll(target.scrollLeft));
  };

  useEffect(() => {
    show && dispatch(setPrevShowId(show.id));
    // eslint-disable-next-line
  }, [dispatch]);

  useLayoutEffect(() => {
    if (ref.current) {
      ref.current.scrollLeft = show?.id === prevShowId ? castScroll : 0;
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div className={styles.cast}>
      <h2 className={styles.heading}>Cast</h2>
      <ul className={styles.castGrid} ref={ref} onScroll={scrollEvent}>
        {show?.aggregate_credits?.cast.map((member, idx) => {
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
        <li className={styles.viewMore}>
          <Link to="cast">
            View More <TiArrowRight />
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default ShowCast;
