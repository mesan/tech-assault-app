import getQuery from './urlQuery';

export default function getUserToken() {
    if (typeof(Storage) === 'undefined') {
        window.alert('Please use a browser that supports local storage.');
    }

    const token = getQuery('token');

    if (token) {
        window.localStorage.setItem('token', token);
    }

    return window.localStorage.getItem('token');
}