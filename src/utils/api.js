const _defaultPath = 'https://gateway.marvel.com/v1/public/';

const _key = 'c0ad5a9aa209a304e59edec435f85768';

async function getResource(url) {
  const res = await fetch(`${url}`);

  if (!res.ok) {
    console.log(res);
    throw new Error(`${url} \n Status: ${res.status}`);
  }

  return await res.json();
}

async function getCharacters(offset = 0) {
  return await getResource(
    `${_defaultPath}characters?offset=${offset}&apikey=${_key}`
  );
}

async function getRandomCharacters() {
  const offset = Math.floor(Math.random() * 1200);
  return await getResource(
    `${_defaultPath}characters?offset=${offset}&orderBy=modified&apikey=${_key}`
  );
}

async function getComics(title, offset = 0) {
  const searchTitle = title ? `&title=${title}` : '';
  const url = `${_defaultPath}comics?offset=${offset}${searchTitle}&apikey=${_key}`;

  return await getResource(url);
}

export { getCharacters, getComics, getRandomCharacters };
