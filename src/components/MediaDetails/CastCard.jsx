import React, { useContext } from 'react';
import { AppContext } from '../../context/app-context';
import { Link } from 'react-router-dom';
import styles from './CastCard.module.scss';

const basePath = 'https://image.tmdb.org/t/p/w780';

const CastCard = ({ name, profile_path: image, character, id }) => {
  const { getActorDetails, actorWork } = useContext(AppContext);

  const URL_PERSON = `https://api.themoviedb.org/3/person/${id}?api_key=${process.env.REACT_APP_API_KEY}`;

  const multipleFunctions = () => {
    getActorDetails(URL_PERSON);
    actorWork(id);
  };

  return (
    <Link
      onClick={multipleFunctions}
      className={styles.card}
      to={`/person/${id}`}
    >
      <img src={`${basePath}${image}`} alt="" />
      <div className={styles.text}>
        <h5 className={styles.actor}>{name}</h5>
        <p>{character}</p>
      </div>
    </Link>
  );
};

export default CastCard;
