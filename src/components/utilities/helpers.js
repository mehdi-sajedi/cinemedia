export function destructMovieProps(entry) {
  return {
    name: entry.title,
    release_date: entry.release_date || '5555-01-01',
    media: 'movies',
    ...entry,
  };
}

export function destructShowProps(entry) {
  return {
    release_date: entry.first_air_date || '5555-01-01',
    media: 'shows',
    ...entry,
  };
}

export function setSearchPayload(query, person, fullName = '', id = null) {
  return {
    query: query,
    person: person,
    personFullName: fullName,
    id: id,
  };
}

export function formatRuntime(runtime) {
  const hours = Math.floor(runtime / 60);
  const remainder = runtime - hours * 60;

  if (hours === 0) {
    return `${remainder}m`;
  } else if (remainder === 0) {
    return `${runtime}m`;
  } else {
    return `${hours}h ${remainder}m`;
  }
}
