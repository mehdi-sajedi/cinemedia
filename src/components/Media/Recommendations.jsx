import styles from './Recommendations.module.scss';
import RecommendationsCard from './RecommendationsCard';
import { useSelector } from 'react-redux';

const Recommendations = () => {
  const { singleMovie } = useSelector((state) => state.movie);
  let backdropCount = 1;

  return (
    <div className={styles.recommendations}>
      <h2 className={styles.heading}>Recommendations</h2>
      <div className={styles.recommendationsGrid}>
        {singleMovie.recommendations?.results.map((entry, idx) => {
          return (
            entry.backdrop_path &&
            backdropCount++ &&
            backdropCount <= 7 && (
              <>
                <RecommendationsCard
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

export default Recommendations;
