import { useAppSelector } from '../../hooks';
import styles from './PersonDetails.module.scss';
import { Link } from 'react-router-dom';
import { BsInstagram, BsFacebook, BsTwitter, BsTiktok } from 'react-icons/bs';
import { HiChevronRight, HiChevronLeft } from 'react-icons/hi';
import { imageBase } from '../../data/imagePaths';
import { getAge, formatDate } from '../../utilities/utilities';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './Carousel.scss';

const PersonDetails = () => {
  const { person } = useAppSelector((state) => state.person);

  const socials = [
    {
      base: 'https://instagram.com/',
      id: person?.external_ids.instagram_id,
      icon: BsInstagram,
      keyID: 5035739184843,
      name: 'Instagram',
    },
    {
      base: 'https://facebook.com/',
      id: person?.external_ids.facebook_id,
      icon: BsFacebook,
      keyID: 4810573175591,
      name: 'Facebook',
    },
    {
      base: 'https://twitter.com/',
      id: person?.external_ids.twitter_id,
      icon: BsTwitter,
      keyID: 1953038502946,
      name: 'Twitter',
    },
    {
      base: 'https://tiktok.com/@',
      id: person?.external_ids.tiktok_id,
      icon: BsTiktok,
      keyID: 732561398455,
      name: 'TikTok',
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
              <button
                onClick={clickHandler}
                className={`${styles.arrowBtn} ${styles.arrowLeft}`}
                aria-label='Previous image'
              >
                <HiChevronLeft />
              </button>
            )}
            renderArrowNext={(clickHandler) => (
              <button
                onClick={clickHandler}
                className={`${styles.arrowBtn} ${styles.arrowRight}`}
                aria-label='Next image'
              >
                <HiChevronRight />
              </button>
            )}
          >
            {person?.images.profiles.map((p) => (
              <img
                key={p.file_path.slice(0, -4)}
                className={styles.image}
                src={`${imageBase}w780${p.file_path}`}
                alt=''
              />
            ))}
          </Carousel>
        ) : (
          person?.profile_path && (
            <img
              className={styles.singleImage}
              src={`${imageBase}w780${person.profile_path}`}
              alt=''
            />
          )
        )}
        <Link
          to={`/search?query=${person?.name.split(' ').join('+')}`}
          className={`${styles.name} ${styles.nameMobile}`}
          aria-label={`Get search results for ${person?.name}`}
          title={`Get search results for ${person?.name}`}
        >
          <h1>{person?.name}</h1>
        </Link>
        <div className={styles.details}>
          <ul className={styles.socials}>
            {socials.map(
              (social) =>
                social.id && (
                  <li key={`${social.id}-${social.keyID}`}>
                    <a
                      href={`${social.base}${social.id}`}
                      target='_blank'
                      rel='noreferrer'
                      aria-label={`${person?.name} ${social.name}`}
                    >
                      {<social.icon />}
                    </a>
                  </li>
                )
            )}
          </ul>
          {socials.some((social) => social.id) && (
            <div className={`${styles.line} ${styles.linePersonal}`}></div>
          )}
          <div className={styles.personalInfo}>
            {person?.known_for_department && (
              <div>
                <h2>Known For</h2>
                <p>{person?.known_for_department}</p>
              </div>
            )}
            {person?.birthday && (
              <div>
                <h2>Birthday</h2>
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
                <h2>Day of Death</h2>
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
                <h2>Place of Birth</h2>
                <p>{person?.place_of_birth}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className={styles.column2}>
        <div>
          <Link
            to={`/search?query=${person?.name?.split(' ').join('+')}`}
            className={`${styles.name} ${styles.nameDesktop}`}
            aria-label={`Get search results for ${person?.name}`}
            title={`Get search results for ${person?.name}`}
          >
            <h1>{person?.name}</h1>
          </Link>
          <div className={`${styles.line} ${styles.lineBio}`}></div>
          <h2 className={styles.bioHeading}>Biography</h2>
          <p className={styles.bio}>
            {person?.biography
              ? person.biography
              : `We don't have a biography for ${person?.name}`}{' '}
          </p>
        </div>
        <div className={styles.knownFor}>
          <h2 className={styles.knownForHeading}>Known For</h2>
          <ul className={styles.knownForGrid}>
            {person?.credits.map((media) => {
              const isMovie = media.media_type === 'movie' ? true : false;
              return (
                <li
                  className={styles.knownForMedia}
                  key={`${media.id}-${media.credit_id}`}
                >
                  <Link to={`/${isMovie ? 'movies' : 'shows'}/${media.id}`}>
                    <img
                      src={`${imageBase}w500${media.poster_path}`}
                      loading='lazy'
                      alt={isMovie ? media.title : media.name}
                    />
                  </Link>
                  <div className={styles.mediaInfo}>
                    <h3 className={styles.title}>
                      {isMovie ? media.title : media.name}
                    </h3>
                    <p className={styles.year}>
                      {isMovie
                        ? media.release_date?.slice(0, 4)
                        : media.first_air_date?.slice(0, 4)}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default PersonDetails;
