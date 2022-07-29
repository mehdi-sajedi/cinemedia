import styles from './ShowCast.module.scss';
import ShowCastCard from './ShowCastCard';
import { useSelector } from 'react-redux';

const ShowCast = () => {
  const { show } = useSelector((state) => state.show);

  return (
    <div className={styles.cast}>
      <h2 className={styles.heading}>Cast</h2>
      <ul className={styles.castGrid}>
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
