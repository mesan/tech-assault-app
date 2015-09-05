import Events from '../../constants/Events';

import requestPostTurnTimeout from '../../util/requests/requestPostTurnTimeout';

export default function onTurnTimeout(timeLimit, sockets, nextTurn) {
    for (let socket of sockets) {
        if (!socket) {
            continue;
        }

        socket.emit(Events.turnDurationLimitExceeded);
    }

    requestPostTurnTimeout(nextTurn)
        .then((response) => console.log(response))
        .catch(err => console.log(err.stack));
}