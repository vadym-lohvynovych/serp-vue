class Api {
  _defaultPath = 'https://gateway.marvel.com/v1/public/';

  _key = 'c0ad5a9aa209a304e59edec435f85768';

  async getResource(url) {
    const res = await fetch(`${url}`);

    if (!res.ok) {
      console.log(res);
      throw new Error(`${url} \n Status: ${res.status}`);
    }

    return await res.json();
  }

  async getCharacters(offset = 0) {
    return await this.getResource(`${this._defaultPath}characters?offset=${offset}&apikey=${this._key}`);
  }

  async getComics(offset = 0) {
    return await this.getResource(`${this._defaultPath}comics?offset=${offset}?apikey=${this._key}`);
  }

  async searchComics(title) {
    return await this.getResource(`${this._defaultPath}comics?title=${title}&apikey=${this._key}`);
  }
}

export default new Api();
