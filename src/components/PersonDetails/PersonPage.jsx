import React, { useContext, useEffect } from 'react';
import { AppContext } from '../../context/app-context';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { BsInstagram, BsFacebook, BsTwitter } from 'react-icons/bs';
import { formatDate } from '../Utilities/helpers';
import styles from './PersonPage.module.scss';
import KnownFor from './KnownFor';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';

const posterBase = 'https://image.tmdb.org/t/p/w500';

const PersonPage = () => {
  const { appState, dispatch } = useContext(AppContext);
  const { person } = appState;
  const { pathname } = useLocation();
  const mediaID = pathname.substring(pathname.lastIndexOf('/') + 1);
  useDocumentTitle(`${person.name}`);

  const URL_PERSON = `https://api.themoviedb.org/3/person/${mediaID}?api_key=${process.env.REACT_APP_API_KEY}&append_to_response=combined_credits,external_ids`;

  useEffect(() => {
    const getActorDetails = async () => {
      const res = await fetch(URL_PERSON);
      let { birthday, deathday, combined_credits, ...rest } = await res.json();

      if (birthday) birthday = birthday.replace(/-/g, '/');
      if (deathday) deathday = deathday.replace(/-/g, '/');

      console.log({ birthday, deathday, combined_credits, ...rest });

      combined_credits.cast = combined_credits.cast
        .filter(
          (media) =>
            !media.genre_ids.includes(10763) || !media.genre_ids.includes(10763)
        )
        .sort((a, b) => b.vote_count - a.vote_count);

      dispatch({
        type: 'SET-PERSON',
        payload: { birthday, deathday, combined_credits, ...rest },
      });
    };
    getActorDetails();
  }, [URL_PERSON, dispatch]);

  const getAge = (birthString, deathString) => {
    const birthDate = new Date(birthString);

    let todayOrDeathDate = new Date();
    if (appState.person.deathday) {
      todayOrDeathDate = new Date(deathString);
    }

    let age = todayOrDeathDate.getFullYear() - birthDate.getFullYear();
    const m = todayOrDeathDate.getMonth() - birthDate.getMonth();
    if (
      m < 0 ||
      (m === 0 && todayOrDeathDate.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };

  const socials = [
    {
      base: 'https://instagram.com/',
      id: appState.person.external_ids?.instagram_id,
      icon: BsInstagram,
      keyID: 5035739184843,
    },
    {
      base: 'https://facebook.com/',
      id: appState.person.external_ids?.facebook_id,
      icon: BsFacebook,
      keyID: 4810573175591,
    },
    {
      base: 'https://twitter.com/',
      id: appState.person.external_ids?.twitter_id,
      icon: BsTwitter,
      keyID: 1953038502946,
    },
  ];

  return (
    <section className={styles.person}>
      <div className={styles.column1}>
        {person.profile_path && (
          <img
            className={styles.image}
            src={`${posterBase}${person.profile_path}`}
            alt=""
          />
        )}
        <Link
          to={`/search?query=${person.name?.split(' ').join('+')}`}
          className={`${styles.name} ${styles.nameMobile}`}
        >
          <h1>{person.name}</h1>
        </Link>

        <aside className={styles.details}>
          <ul className={styles.socials}>
            {socials.map(
              (social) =>
                social.id && (
                  <li key={`${social.id}-${social.keyID}`}>
                    <a
                      href={`${social.base}${social.id}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {<social.icon />}
                    </a>
                  </li>
                )
            )}
          </ul>

          {(person.birthday || person.deathday || person.place_of_birth) && (
            <>
              <h3 className={styles.personalInfoHeading}>Personal Info</h3>
              <div className={`${styles.line} ${styles.linePersonal}`}></div>
            </>
          )}

          <div className={styles.personalInfo}>
            {appState.person.birthday && (
              <div className={styles.birthday}>
                <h4>Birthday</h4>
                <p>
                  {formatDate(person.birthday)}
                  {!appState.person.deathday && (
                    <span>
                      {' '}
                      ({getAge(person.birthday, person.deathday)} years old)
                    </span>
                  )}
                </p>
              </div>
            )}
            {appState.person.deathday && (
              <div className={styles.deathday}>
                <h4>Day of Death</h4>
                <p>
                  {formatDate(person.deathday)}
                  <span>
                    {' '}
                    ({getAge(person.birthday, person.deathday)} years old)
                  </span>
                </p>
              </div>
            )}
            {person.place_of_birth && (
              <div className={styles.birthplace}>
                <h4>Place of Birth</h4>
                <p>{person.place_of_birth}</p>
              </div>
            )}
          </div>
        </aside>
      </div>

      <div className={styles.column2}>
        <div className={styles.mainText}>
          <Link
            to={`/search?query=${person.name?.split(' ').join('+')}`}
            className={`${styles.name} ${styles.nameDesktop}`}
          >
            <h1>{person.name}</h1>
          </Link>
          <div className={`${styles.line} ${styles.lineBio}`}></div>
          {person.biography && (
            <>
              <h3 className={styles.bioHeading}>Biography</h3>
              <p className={styles.bio}>{person.biography}</p>
            </>
          )}
        </div>
        <KnownFor />
      </div>
    </section>
  );
};

export default PersonPage;
