import request from '../request';

let {
    TECH_DOMAIN_ENDPOINT
    } = process.env;

export default function requestPlayerDeck(userId) {
    return request('GET', `${TECH_DOMAIN_ENDPOINT}/players/${userId}/deck`).pend()
        .then((response) => JSON.parse(response.text));
}