import request from '../request';

let {
    TECH_DOMAIN_ENDPOINT
    } = process.env;

const NUMBER_OF_HIGHSCORES = 10;

export default function requestHighscores() {
    return request('GET', `${TECH_DOMAIN_ENDPOINT}/rankings/${NUMBER_OF_HIGHSCORES}`)
        .pend()
        .then(response => JSON.parse(response.text));
}