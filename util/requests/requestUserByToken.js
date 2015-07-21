import request from '../request';

let {
    TECH_AUTH_ENDPOINT
} = process.env;

export default function getUserByTokenRequest(token) {
    return request(`${TECH_AUTH_ENDPOINT}/users?token=${token}`).pend();
}