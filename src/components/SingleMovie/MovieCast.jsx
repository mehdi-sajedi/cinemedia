import styles from './MovieCast.module.scss';
import MovieCastCard from './MovieCastCard';
import { useSelector } from 'react-redux';

const MovieCast = () => {
  const { movie } = useSelector((state) => state.movie);

  return (
    <div className={styles.cast}>
      <h2 className={styles.heading}>Cast</h2>
      <ul className={styles.castGrid}>
        {movie.credits?.cast.map((member, idx) => {
          return (
            member.profile_path &&
            idx < 20 && (
              <MovieCastCard
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

export default MovieCast;
