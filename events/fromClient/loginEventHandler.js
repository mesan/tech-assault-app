import Events from '../../constants/Events';

import requestUserByToken from '../../util/requests/requestUserByToken';

export default function loginEventHandler(userToken) {
    requestUserByToken(userToken)
        .then(({ responseBody }) => {
            this.server.tokenSocketMap[userToken] = this.socket;
            this.socket.token = userToken;

            const { name, avatar } = responseBody;

            this.socket.emit(Events.loginAccepted, { name, avatar });
        })
        .catch((err) => {
            if (err.status === 404) {
                this.socket.emit(Events.loginRefused, { reason: 'Not Found' });
                return;
            }

            console.log(err.stack);
        });
}