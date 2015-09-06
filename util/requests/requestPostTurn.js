import request from '../request';

let {
    TECH_DOMAIN_ENDPOINT
    } = process.env;

export default function requestPostTurn(userId, turn) {
    return request('POST', `${TECH_DOMAIN_ENDPOINT}/matches/turns/${userId}`)
        .send(turn)
        .pend()
        .then(response => {
            if (response.status !== 200) {
                throw response;
            }

            return response;
        })
        .then(response => JSON.parse(response.text));
}