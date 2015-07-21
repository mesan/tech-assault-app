import request from '../util/request';

import requestUserByToken from '../util/requests/requestUserByToken';
import requestPostEnlistment from '../util/requests/requestPostEnlistment';

export default function enlistOpponentEventHandler() {
    requestPostEnlistment(this.token)
        .catch((err) => {
            console.log(err.stack);
        });
}