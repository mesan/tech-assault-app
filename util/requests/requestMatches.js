import request from '../request';

let {
    TECH_DOMAIN_ENDPOINT
    } = process.env;

export default function requestMatches(userToken) {
    return request('GET', `${TECH_DOMAIN_ENDPOINT}/matches`).pend()
        .then((response) => {
            return JSON.parse(response.text);
        });
}