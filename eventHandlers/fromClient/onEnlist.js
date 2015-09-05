import requestPostEnlistment from '../../util/requests/requestPostEnlistment';
import requestUserByToken from '../../util/requests/requestUserByToken';
import requestActiveMatchByUserId from '../../util/requests/requestActiveMatchByUserId';

import Events from '../../constants/Events';

export default function onEnlist() {
    const { token } = this.socket;

    requestUserByToken(token)
        .then(user => requestActiveMatchByUserId(user.id))
        .then(match => {
            if (match) {
                return this.socket.emit(Events.userUnauthorized, { event: Events.playerEnlisted, reason: 'In match' });
            }

            return requestPostEnlistment(token);
        })
        .catch((err) => {
            if (err.status === 404) {
                this.socket.emit(Events.userUnauthorized, { event: Events.playerEnlisted, reason: 'Not Found' });
            }
            console.log(err.stack);
        });
}