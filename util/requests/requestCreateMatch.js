import request from '../request';

let {
    TECH_DOMAIN_ENDPOINT
} = process.env;

export default function requestCreateMatch(user1, user2) {
    return request('POST', `${TECH_DOMAIN_ENDPOINT}/matches`)
        .send([ user1, user2 ])
        .pend()
        .then(response => JSON.parse(response.text));
}