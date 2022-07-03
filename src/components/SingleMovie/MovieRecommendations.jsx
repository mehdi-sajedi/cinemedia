import styles from './MovieRecommendations.module.scss';
import MovieRecommendationsCard from './MovieRecommendationsCard';
import { useSelector } from 'react-redux';

const MovieRecommendations = () => {
  const { movie } = useSelector((state) => state.movie);
  let backdropCount = 1;

  return (
    <div className={styles.recommendations}>
      <h2 className={styles.heading}>Recommendations</h2>
      <div className={styles.recommendationsGrid}>
        {movie.recommendations?.results.map((entry, idx) => {
          return (
            entry.backdrop_path &&
            backdropCount++ &&
            backdropCount <= 7 && (
              <>
                <MovieRecommendationsCard
                  {...entry}
                  key={`${entry.id}-${entry.popularity}`}
                />
              </>
            )
          );
        })}
      </div>
    </div>
  );
};

export default MovieRecommendations;
