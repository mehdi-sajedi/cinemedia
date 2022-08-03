import styles from './CreditsList.module.scss';
import { useSelector } from 'react-redux';
import CreditsItem from './CreditsItem';

const CreditsList = ({ creditType }) => {
  const { movie } = useSelector((state) => state.movie);

  return (
    <div className={styles.listContainer}>
      <h3 className={styles.listHeading}>{creditType}</h3>
      <ul className={styles.list}>
        {movie.credits?.[creditType].map(
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
