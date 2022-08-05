import { Link } from 'react-router-dom';
import { BsInstagram, BsFacebook, BsTwitter } from 'react-icons/bs';
import styles from './PersonDetails.module.scss';
import { useSelector } from 'react-redux';
import { getAge, formatDate } from '../../utilities/utilities';

const posterBase = 'https://image.tmdb.org/t/p/w500';

const PersonDetails = () => {
  const { person } = useSelector((state) => state.person);

  let creditType = 'cast';
  if (person.known_for_department !== 'Acting') creditType = 'crew';

  const socials = [
    {
      base: 'https://instagram.com/',
      id: person.external_ids?.instagram_id,
      icon: BsInstagram,
      keyID: 5035739184843,
    },
    {
      base: 'https://facebook.com/',
      id: person.external_ids?.facebook_id,
      icon: BsFacebook,
      keyID: 4810573175591,
    },
    {
      base: 'https://twitter.com/',
      id: person.external_ids?.twitter_id,
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

          {(person.birthday ||
            person.deathday ||
            person.place_of_birth ||
            person.known_for_department) && (
            <>
              <h3 className={styles.personalInfoHeading}>Personal Info</h3>
              <div className={`${styles.line} ${styles.linePersonal}`}></div>
            </>
          )}

          <div className={styles.personalInfo}>
            {person.known_for_department && (
              <div className={styles.knownForDep}>
                <h4>Known For</h4>
                <p>{person.known_for_department}</p>
              </div>
            )}
            {person.birthday && (
              <div className={styles.birthday}>
                <h4>Birthday</h4>
                <p>
                  {formatDate(person.birthday.replace(/-/g, '/'))}
                  {!person.deathday && (
                    <span>
                      {' '}
                      ({getAge(person.birthday, person.deathday)} years old)
                    </span>
                  )}
                </p>
              </div>
            )}
            {person.deathday && (
              <div className={styles.deathday}>
                <h4>Day of Death</h4>
                <p>
                  {formatDate(person.deathday.replace(/-/g, '/'))}
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
        <div className={styles.knownFor}>
          <h3 className={styles.knownForHeading}>Known For</h3>
          <div className={styles.knownForGrid}>
            {person.combined_credits?.[creditType].map((media) => {
              const route = media.media_type === 'movie' ? 'movies' : 'shows';
              return (
                media.poster_path && (
                  <div
                    className={styles.knownForMedia}
                    key={`${media.id}-${media.credit_id}`}
                  >
                    <Link to={`../${route}/${media.id}`}>
                      <img
                        src={`${posterBase}${media.poster_path}`}
                        loading="lazy"
                        alt=""
                      />
                    </Link>
                    <h5 className={styles.title}>
                      {media.name ? media.name : media.title}
                    </h5>
                  </div>
                )
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PersonDetails;
