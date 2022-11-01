import styles from './CreditsList.module.scss';
import { useAppSelector } from '../../hooks';
import CreditsItem from './CreditsItem';

interface CreditsListProps {
  creditType: string;
}

const CreditsList = ({ creditType }: CreditsListProps) => {
  const { movie } = useAppSelector((state) => state.movie);

  return (
    <div className={styles.listContainer}>
      <h3 className={styles.listHeading}>{creditType}</h3>
      <ul className={styles.list}>
        {movie?.credits?.[creditType as keyof typeof movie.credits].map(
          (c) =>
            c.profile_path && (
              <CreditsItem {...c} key={c.credit_id} creditType={creditType} />
            )
        )}
      </ul>
    </div>
  );
};

export default CreditsList;
