import requestPostEnlistment from '../../util/requests/requestPostEnlistment';
import requestUserByToken from '../../util/requests/requestUserByToken';
import requestActiveMatchByUserId from '../../util/requests/requestActiveMatchByUserId';

import Events from '../../constants/Events';

export default function onEnlist() {
    const { token } = this.socket;

    requestUserByToken(token)
        .then(user => requestPostEnlistment(user.id, token))
        .catch((err) => {
            /*if (match) {
                return this.socket.emit(Events.userUnauthorized, { event: Events.enlist, reason: 'In match' });
            }
            if (err.status === 404) {
                this.socket.emit(Events.userUnauthorized, { event: Events.enlist, reason: 'Not Found' });
            }*/
            console.log(err.stack);
        });
}