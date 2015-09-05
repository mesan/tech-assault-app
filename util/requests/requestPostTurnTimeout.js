import request from '../request';

let {
    TECH_DOMAIN_ENDPOINT
    } = process.env;

export default function requestPostTurnTimeout(userId) {
    return request('POST', `${TECH_DOMAIN_ENDPOINT}/matches/turn-timeouts/${userId}`)
        .send()
        .pend()
        .then(response => JSON.parse(response.text));
}