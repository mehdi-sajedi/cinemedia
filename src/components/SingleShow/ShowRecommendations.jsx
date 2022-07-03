import styles from './ShowRecommendations.module.scss';
import ShowRecommendationsCard from './ShowRecommendationsCard';
import { useSelector } from 'react-redux';

const ShowRecommendations = () => {
  const { show } = useSelector((state) => state.show);
  let backdropCount = 1;

  return (
    <div className={styles.recommendations}>
      <h2 className={styles.heading}>Recommendations</h2>
      <div className={styles.recommendationsGrid}>
        {show.recommendations?.results.map((entry, idx) => {
          return (
            entry.backdrop_path &&
            backdropCount++ &&
            backdropCount <= 7 && (
              <>
                <ShowRecommendationsCard
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

export default ShowRecommendations;
