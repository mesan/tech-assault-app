import requestPostEnlistment from '../../util/requests/requestPostEnlistment';
import requestUserByToken from '../../util/requests/requestUserByToken';

import Events from '../../constants/Events';

export default function onPlayerEnlisted() {
    requestUserByToken(this.socket.token)
        .then((user) => {
            return requestPostEnlistment(this.socket.token);
        })
        .catch((err) => {
            console.log(err.status);
            if (err.status === 404) {
                this.socket.emit(Events.userUnauthorized, { event: Events.playerEnlisted, reason: 'Not Found' });
            }
            console.log(err.stack);
        });
}