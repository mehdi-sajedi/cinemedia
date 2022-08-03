import styles from './CreditsList.module.scss';
import { useSelector } from 'react-redux';
import CreditsItem from './CreditsItem';

const CreditsList = ({ creditType, work }) => {
  const { show } = useSelector((state) => state.show);

  return (
    <div className={styles.listContainer}>
      <h3 className={styles.listHeading}>{creditType}</h3>
      <ul className={styles.list}>
        {show.aggregate_credits?.[creditType].map(
          (c) =>
            c.profile_path && (
              <CreditsItem
                {...c}
                work={c[work][0]}
                key={c[work][0].credit_id}
                creditType={creditType}
              />
            )
        )}
      </ul>
    </div>
  );
};

export default CreditsList;
