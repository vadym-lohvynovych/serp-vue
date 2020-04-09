export default class Api {
	_defaultPath = "https://gateway.marvel.com/";

	_key = "c0ad5a9aa209a304e59edec435f85768";

	async getResource(url) {
		const res = await fetch(`${url}`);

		if (!res.ok) {
			console.log(res);
			throw new Error(`${url} \n Status: ${res.status}`);
		}

		return await res.json();
	}

	async getCharacters(offset = 0) {
		return await this.getResource(`https://gateway.marvel.com:443/v1/public/characters?offset=${offset}&apikey=${this._key}`);
	}

	async getAllComics() {
        return await this.getResource(`${this._defaultPath}v1/public/comics?apikey=${this._key}`);
    }
    
    async searchComics(title) {
		return await this.getResource(`${this._defaultPath}v1/public/comics?title=${title}&apikey=${this._key}`);
	}

}
