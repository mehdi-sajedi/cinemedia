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

export function colorPercentage(pct) {
  const percentColors = [
    { pct: 0.4, color: { r: 0xff, g: 0x00, b: 0 } },
    { pct: 0.7, color: { r: 0xff, g: 0xff, b: 0 } },
    { pct: 0.9, color: { r: 0x00, g: 0xff, b: 0 } },
  ];

  for (var i = 1; i < percentColors.length - 1; i++) {
    if (pct < percentColors[i].pct) {
      break;
    }
  }
  const lower = percentColors[i - 1];
  const upper = percentColors[i];
  const range = upper.pct - lower.pct;
  const rangePct = (pct - lower.pct) / range;
  const pctLower = 1 - rangePct;
  const pctUpper = rangePct;
  const color = {
    r: Math.floor(lower.color.r * pctLower + upper.color.r * pctUpper),
    g: Math.floor(lower.color.g * pctLower + upper.color.g * pctUpper),
    b: Math.floor(lower.color.b * pctLower + upper.color.b * pctUpper),
  };
  return 'rgb(' + [color.r, color.g, color.b].join(',') + ')';
}
