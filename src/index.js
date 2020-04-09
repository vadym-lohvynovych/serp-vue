import Api from './api';
import './app/scss/main.scss'

const api = new Api;

api.searchComics('spider-man').then(res => {
    console.log('Api is Ready!')
    console.log(res);
})