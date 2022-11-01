import { useAppSelector } from '../../hooks';
import styles from './MovieRecommendations.module.scss';
import MovieRecommendationsCard from './MovieRecommendationsCard';

const MovieRecommendations = () => {
  const { movie } = useAppSelector((state) => state.movie);
  let backdropCount = 1;

  return (
    <div className={styles.recommendations}>
      <h2 className={styles.heading}>Recommendations</h2>
      <div className={styles.recommendationsGrid}>
        {movie?.recommendations?.results.map((entry) => {
          return (
            entry.backdrop_path &&
            backdropCount++ &&
            backdropCount <= 7 && (
              <MovieRecommendationsCard
                {...entry}
                key={`${entry.id}${entry.popularity}`}
              />
            )
          );
        })}
      </div>
    </div>
  );
};

export default MovieRecommendations;
