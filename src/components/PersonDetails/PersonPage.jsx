import React, { useContext, useEffect } from 'react';
import { AppContext } from '../../context/app-context';
import { useLocation } from 'react-router';
import styles from './PersonPage.module.scss';

const posterBase = 'https://image.tmdb.org/t/p/original';

const PersonPage = () => {
  const { appState, dispatch } = useContext(AppContext);
  const { person } = appState;
  const { pathname } = useLocation();
  const mediaID = pathname.substring(pathname.lastIndexOf('/') + 1);

  const URL_PERSON = `https://api.themoviedb.org/3/person/${mediaID}?api_key=${process.env.REACT_APP_API_KEY}`;

  useEffect(() => {
    const getActorDetails = async () => {
      const res = await fetch(URL_PERSON);
      let { birthday, ...rest } = await res.json();
      if (!birthday) birthday = new Date('101, 1, 0');
      else {
        birthday = birthday.replace(/-/g, '/');
      }
      console.log({ birthday, ...rest });
      dispatch({ type: 'SET-PERSON', payload: { birthday, ...rest } });
    };
    getActorDetails();
  }, [URL_PERSON, dispatch]);

  const formattedBirthday = new Date(person.birthday).toLocaleString('en-US', {
    day: 'numeric',
    year: 'numeric',
    month: 'long',
  });

  function getAge(dateString) {
    const today = new Date();
    const birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  return (
    <section className={styles.person}>
      <div className={styles.column1}>
        <img src={`${posterBase}${person.profile_path}`} alt="" />
        <aside className={styles.details}>
          <h3>Personal Info</h3>
          <div className={styles.birthday}>
            <h4>Birthday</h4>
            <p>
              {formattedBirthday} ({getAge(person.birthday)} years old)
            </p>
          </div>
          <div className={styles.birthplace}>
            <h4>Place of Birth</h4>
            <p>{person.place_of_birth}</p>
          </div>
        </aside>
      </div>

      <div className={styles.column2}>
        <div className={styles.mainText}>
          <h1 className={styles.name}>{person.name}</h1>
          <p className={styles.bio}>{person.biography}</p>
        </div>
      </div>
    </section>
  );
};

export default PersonPage;
