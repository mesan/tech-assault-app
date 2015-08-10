import request from '../request';

let {
    TECH_DOMAIN_ENDPOINT
} = process.env;

export default function requestCreateMatch(userId1, userId2) {
    return request('POST', `${TECH_DOMAIN_ENDPOINT}/matches`)
        .send([ userId1, userId2 ])
        .pend()
        .then(response => JSON.parse(response.text));
}