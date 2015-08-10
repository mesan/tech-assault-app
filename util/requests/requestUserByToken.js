import request from '../request';

let {
    TECH_AUTH_ENDPOINT
} = process.env;

export default function requestUserByToken(token) {
    return request(`${TECH_AUTH_ENDPOINT}/users/${token}`).pend()
        .then((response) => {
            const user = JSON.parse(response.text);

            return user;
        });
}