import request from '../request';

let {
    TECH_DOMAIN_ENDPOINT
} = process.env;

export default function postEnlistmentRequest(userToken) {
    return request('POST', `${TECH_DOMAIN_ENDPOINT}/enlistments/${userToken}`).pend();
}