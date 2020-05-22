const _defaultPath = 'https://gateway.marvel.com/v1/public/';

const _key = 'c0ad5a9aa209a304e59edec435f85768';

const createQueryParameter = (query, name) =>
  query ? `&${name}=${query}` : '';

async function getResource(url) {
  const res = await fetch(`${url}`);

  if (!res.ok) {
    console.error(res);
    return Promise.reject(res);
  }

  return await res.json();
}

async function searchCharacters(searchQuery, offset = 0) {
  const query = createQueryParameter(searchQuery, 'nameStartsWith');
  const url = `${_defaultPath}characters?offset=${offset}${query}&apikey=${_key}`;

  return await getResource(url);
}

async function searchComics(searchQuery, offset = 0) {
  const query = createQueryParameter(searchQuery, 'titleStartsWith');
  const url = `${_defaultPath}comics?offset=${offset}${query}&apikey=${_key}`;

  return await getResource(url);
}

async function searchSeries(searchQuery, offset = 0) {
  const query = createQueryParameter(searchQuery, 'titleStartsWith');
  const url = `${_defaultPath}comics?offset=${offset}${query}&apikey=${_key}`;

  return await getResource(url);
}

async function getCharactersById(id) {
  return await getResource(`${_defaultPath}characters/${id}?apikey=${_key}`);
}

async function getComicsById(id) {
  return await getResource(`${_defaultPath}comics/${id}?apikey=${_key}`);
}

async function getStoriesById(id) {
  return await getResource(`${_defaultPath}stories/${id}?apikey=${_key}`);
}

async function getSeriesById(id) {
  return await getResource(`${_defaultPath}series/${id}?apikey=${_key}`);
}

async function getCreatorsById(id) {
  return await getResource(`${_defaultPath}creators/${id}?apikey=${_key}`);
}

async function searchAll() {
  const offset = Math.floor(Math.random() * 1200);
  return await getResource(
    `${_defaultPath}characters?offset=${offset}&orderBy=modified&apikey=${_key}`
  );
}

export {
  searchCharacters,
  searchComics,
  searchSeries,
  getCharactersById,
  getComicsById,
  searchAll,
  getStoriesById,
  getSeriesById,
  getCreatorsById
};
