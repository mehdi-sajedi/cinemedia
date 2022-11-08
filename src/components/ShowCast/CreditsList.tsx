import styles from './CreditsList.module.scss';
import CreditsItem from './CreditsItem';
import { CastCredit, CrewCredit } from '../../features/shows/showTypes';

interface CreditsListProps {
  credits?: CastCredit[] | CrewCredit[];
  creditType: string;
}

const CreditsList = ({ credits, creditType }: CreditsListProps) => {
  return (
    <div className={styles.listContainer}>
      <h3 className={styles.listHeading}>{creditType}</h3>
      <ul className={styles.list}>
        {credits?.map(
          (c) =>
            c.profile_path && (
              <CreditsItem
                {...c}
                credits={'roles' in c ? c.roles : c.jobs}
                key={
                  'roles' in c ? c.roles?.[0].credit_id : c.jobs?.[0].credit_id
                }
              />
            )
        )}
      </ul>
    </div>
  );
};

export default CreditsList;
