import styles from './Cast.module.scss';
import CastCard from './CastCard';
import { useSelector } from 'react-redux';

const Cast = () => {
  const { singleMovie } = useSelector((state) => state.movie);

  return (
    <div className={styles.cast}>
      <h2 className={styles.heading}>Cast</h2>
      <ul className={styles.castGrid}>
        {singleMovie.credits?.cast.map((member, idx) => {
          return (
            member.profile_path &&
            idx < 20 && (
              <CastCard {...member} key={`${member.id}-${member.popularity}`} />
            )
          );
        })}
      </ul>
    </div>
  );
};

export default Cast;
