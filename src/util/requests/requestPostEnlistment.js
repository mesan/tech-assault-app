import request from '../request';

let {
    TECH_DOMAIN_ENDPOINT
} = process.env;

export default function requestPostEnlistment(userId, userToken) {
    return request('POST', `${TECH_DOMAIN_ENDPOINT}/enlistments/${userId}/${userToken}`).pend();
}