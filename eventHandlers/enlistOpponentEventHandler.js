import request from '../util/request';

import requestUserByToken from '../util/requests/requestUserByToken';
import requestPostEnlistment from '../util/requests/requestPostEnlistment';

export default function enlistOpponentEventHandler() {
    let token = this.token;

    let d = (new Date()).getTime();

    requestUserByToken(token)
        .then((response) => {
            let user = JSON.parse(response.text);
            return requestPostEnlistment(user.id);
        })
        .catch((err) => {
            console.log(err.stack);
        });
}