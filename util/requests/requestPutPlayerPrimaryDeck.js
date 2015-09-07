import request from '../request';

let {
    TECH_DOMAIN_ENDPOINT
    } = process.env;

export default function requestPutPlayerPrimaryDeck(userId, primaryDeck) {
    if (primaryDeck.constructor !== Array) {
        throw 'Accepts only an array!'
    }

    return request('PUT', `${TECH_DOMAIN_ENDPOINT}/players/${userId}/deck/primary`)
        .send(primaryDeck)
        .pend()
        .then((response) => JSON.parse(response.text));
}