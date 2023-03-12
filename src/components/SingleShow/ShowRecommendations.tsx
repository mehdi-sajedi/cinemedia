import { useAppSelector } from '../../hooks';
import styles from './ShowRecommendations.module.scss';
import ShowRecommendationsCard from './ShowRecommendationsCard';

const ShowRecommendations = () => {
  const { show } = useAppSelector((state) => state.show);
  let backdropCount = 1;

  return (
    <div className={styles.recommendations}>
      <h2 className={styles.heading}>Recommendations</h2>
      <ul className={styles.recommendationsGrid}>
        {show?.recommendations?.results.map((entry) => {
          return (
            entry.backdrop_path &&
            backdropCount++ &&
            backdropCount <= 7 && (
              <ShowRecommendationsCard
                {...entry}
                key={`${entry.id}-${entry.popularity}`}
              />
            )
          );
        })}
      </ul>
    </div>
  );
};

export default ShowRecommendations;
