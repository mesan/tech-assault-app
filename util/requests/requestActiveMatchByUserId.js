import request from '../request';

let {
    TECH_DOMAIN_ENDPOINT
    } = process.env;

export default function requestActiveMatchByUserId(userId) {
    return request('GET', `${TECH_DOMAIN_ENDPOINT}/matches/active/${userId}`).pend()
        .then((response) => {
            return JSON.parse(response.text);
        });
}