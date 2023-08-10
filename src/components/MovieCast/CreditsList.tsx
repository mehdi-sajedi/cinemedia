import styles from './CreditsList.module.scss';
import CreditsItem from './CreditsItem';
import { SingleMovie } from '../../features/movies/movieTypes';

interface CreditsListProps {
  credits?: SingleMovie['credits']['cast'] | SingleMovie['credits']['crew'];
  kind: 'Cast' | 'Crew';
}

const CreditsList = ({ credits, kind }: CreditsListProps) => {
  return (
    <div className={styles.listContainer}>
      <h2 className={styles.listHeading}>{kind}</h2>
      <ul className={styles.list}>
        {credits?.map(
          (c) =>
            c.profile_path && (
              <CreditsItem {...c} key={c.credit_id} kind={kind} />
            )
        )}
      </ul>
    </div>
  );
};

export default CreditsList;
