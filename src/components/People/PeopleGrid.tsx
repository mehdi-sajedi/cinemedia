import { useAppSelector } from '../../hooks';
import styles from './PeopleGrid.module.scss';
import PeopleCard from './PeopleCard';

const PersonGrid = () => {
  const { results } = useAppSelector((state) => state.person);

  return (
    <section className={styles.grid}>
      {results.map((p) => (
        <PeopleCard {...p} key={p.id} />
      ))}
    </section>
  );
};

export default PersonGrid;
