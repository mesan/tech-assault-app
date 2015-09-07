import requestPostEnlistment from '../../util/requests/requestPostEnlistment';
import requestUserByToken from '../../util/requests/requestUserByToken';
import requestActiveMatchByUserId from '../../util/requests/requestActiveMatchByUserId';

import Events from '../../constants/Events';

export default function onEnlist() {
    const { token } = this.socket;

    requestUserByToken(token)
        .then(user => requestPostEnlistment(user.id, token))
        .catch((err) => {
            console.error('Could not enlist player', err, err.stack);
        });
}