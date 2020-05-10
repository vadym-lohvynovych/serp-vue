const _defaultPath = 'https://gateway.marvel.com/v1/public/';

const _key = 'c0ad5a9aa209a304e59edec435f85768';

async function getResource(url) {
  const res = await fetch(`${url}`);

  if (!res.ok) {
    console.error(res);
    return Promise.reject(res);
  }

  return await res.json();
}

async function searchCharacters(offset = 0) {
  return await getResource(
    `${_defaultPath}characters?offset=${offset}&apikey=${_key}`
  );
}

async function getCharacterById(id) {
  return await getResource(`${_defaultPath}characters/${id}?apikey=${_key}`);
}

async function searchComics(title, offset = 0) {
  const searchTitle = title ? `&title=${title}` : '';
  const url = `${_defaultPath}comics?offset=${offset}${searchTitle}&apikey=${_key}`;

  return await getResource(url);
}

async function getComicsById(id) {
  return await getResource(`${_defaultPath}comics/${id}?apikey=${_key}`);
}

async function getStoryById(id) {
  return await getResource(`${_defaultPath}stories/${id}?apikey=${_key}`);
}

async function getSeriesById(id) {
  return await getResource(`${_defaultPath}series/${id}?apikey=${_key}`);
}

async function getCreatorById(id) {
  return await getResource(`${_defaultPath}creators/${id}?apikey=${_key}`);
}

async function getRandomCharacters() {
  const offset = Math.floor(Math.random() * 1200);
  return await getResource(
    `${_defaultPath}characters?offset=${offset}&orderBy=modified&apikey=${_key}`
  );
}

export {
  searchCharacters,
  getCharacterById,
  searchComics,
  getComicsById,
  getRandomCharacters,
  getStoryById,
  getSeriesById,
  getCreatorById
};
