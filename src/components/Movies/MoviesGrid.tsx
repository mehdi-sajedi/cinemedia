import { useAppSelector } from "../../hooks";
import MoviesCard from "./MoviesCard";
import styles from "./MoviesGrid.module.scss";

const MoviesGrid = () => {
  const { results, filterMenuOpen } = useAppSelector((state) => state.movie);

  return (
    <section
      className={`${styles.grid} ${filterMenuOpen ? styles.menuOpen : ""} ${
        styles[results.length]
      }`}
    >
      {results.map((entry: any) => {
        return (
          entry.poster_path && (
            <MoviesCard {...entry} key={`${entry.id}${entry.credit_id}`} />
          )
        );
      })}
    </section>
  );
};

export default MoviesGrid;
