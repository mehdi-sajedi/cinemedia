import { useAppSelector } from '../../hooks';
import styles from './PersonDetails.module.scss';
import { Link } from 'react-router-dom';
import { BsInstagram, BsFacebook, BsTwitter } from 'react-icons/bs';
import { HiChevronRight, HiChevronLeft } from 'react-icons/hi';
import { imageBase } from '../../data/imagePaths';
import { getAge, formatDate } from '../../utilities/utilities';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const PersonDetails = () => {
  const { person } = useAppSelector((state) => state.person);

  const socials = [
    {
      base: 'https://instagram.com/',
      id: person?.external_ids.instagram_id,
      icon: BsInstagram,
      keyID: 5035739184843,
    },
    {
      base: 'https://facebook.com/',
      id: person?.external_ids.facebook_id,
      icon: BsFacebook,
      keyID: 4810573175591,
    },
    {
      base: 'https://twitter.com/',
      id: person?.external_ids.twitter_id,
      icon: BsTwitter,
      keyID: 1953038502946,
    },
  ];

  const hasMultipleImages = person?.images.profiles.length! > 1;

  return (
    <section className={styles.person}>
      <div className={styles.column1}>
        {hasMultipleImages ? (
          <Carousel
            className={styles.carousel}
            showArrows={true}
            infiniteLoop={true}
            showThumbs={false}
            showStatus={false}
            renderArrowPrev={(clickHandler) => (
              <HiChevronLeft
                className={`${styles.arrow} ${styles.arrowLeft}`}
                onClick={clickHandler}
              />
            )}
            renderArrowNext={(clickHandler) => (
              <HiChevronRight
                className={`${styles.arrow} ${styles.arrowRight}`}
                onClick={clickHandler}
              />
            )}
          >
            {person?.images.profiles.map((p) => (
              <img
                key={p.file_path.slice(0, -4)}
                className={styles.image}
                src={`${imageBase}w780${p.file_path}`}
                alt=""
              />
            ))}
          </Carousel>
        ) : (
          person?.profile_path && (
            <img
              className={styles.singleImage}
              src={`${imageBase}w780${person.profile_path}`}
              alt=""
            />
          )
        )}
        <Link
          to={`/search?query=${person?.name.split(' ').join('+')}`}
          className={`${styles.name} ${styles.nameMobile}`}
        >
          <h1>{person?.name}</h1>
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
          {(person?.birthday ||
            person?.deathday ||
            person?.place_of_birth ||
            person?.known_for_department) && (
            <>
              <h3 className={styles.personalInfoHeading}>Personal Info</h3>
              <div className={`${styles.line} ${styles.linePersonal}`}></div>
            </>
          )}
          <div className={styles.personalInfo}>
            {person?.known_for_department && (
              <div>
                <h4>Known For</h4>
                <p>{person?.known_for_department}</p>
              </div>
            )}
            {person?.birthday && (
              <div>
                <h4>Birthday</h4>
                <p>
                  {formatDate(person?.birthday.replace(/-/g, '/'))}
                  {!person.deathday && (
                    <span>
                      {' '}
                      ({getAge(person.birthday, person.deathday)} years old)
                    </span>
                  )}
                </p>
              </div>
            )}
            {person?.deathday && (
              <div>
                <h4>Day of Death</h4>
                <p>
                  {formatDate(person?.deathday.replace(/-/g, '/'))}
                  <span>
                    {' '}
                    ({getAge(person?.birthday, person?.deathday)} years old)
                  </span>
                </p>
              </div>
            )}
            {person?.place_of_birth && (
              <div>
                <h4>Place of Birth</h4>
                <p>{person?.place_of_birth}</p>
              </div>
            )}
          </div>
        </aside>
      </div>

      <div className={styles.column2}>
        <div>
          <Link
            to={`/search?query=${person?.name?.split(' ').join('+')}`}
            className={`${styles.name} ${styles.nameDesktop}`}
          >
            <h1>{person?.name}</h1>
          </Link>
          <div className={`${styles.line} ${styles.lineBio}`}></div>
          <h3 className={styles.bioHeading}>Biography</h3>
          <p className={styles.bio}>
            {person?.biography
              ? person.biography
              : `We don't have a biography for ${person?.name}`}{' '}
          </p>
        </div>
        <div className={styles.knownFor}>
          <h3 className={styles.knownForHeading}>Known For</h3>
          <div className={styles.knownForGrid}>
            {person?.credits.map((media) => {
              const route = media.media_type === 'movie' ? 'movies' : 'shows';
              return (
                <div
                  className={styles.knownForMedia}
                  key={`${media.id}-${media.credit_id}`}
                >
                  <Link to={`../${route}/${media.id}`}>
                    <img
                      src={`${imageBase}w500${media.poster_path}`}
                      loading="lazy"
                      alt=""
                    />
                  </Link>
                  <h5 className={styles.title}>
                    {media.media_type === 'movie' ? media.title : media.name}
                  </h5>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PersonDetails;
