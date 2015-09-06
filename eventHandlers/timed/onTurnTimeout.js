import Events from '../../constants/Events';

import requestPostTurnTimeout from '../../util/requests/requestPostTurnTimeout';
import mapToMatchesPerUser from './mapToMatchesPerUser';

export default function onTurnTimeout(sockets, timeLimit, nextTurn) {
    requestPostTurnTimeout(nextTurn)
        .then((match) => {
            const { users } = match;

            const eventType = match.cardsLooted && match.cardsLooted.length > 0
                ? Events.lootPerformed
                : Events.matchFinished;

            const matchEvents  = mapToMatchesPerUser(match);

            for (let i = 0 ; i < sockets.length; i++) {
                const socket = sockets[i];

                if (socket) {
                    socket.emit(eventType, matchEvents[i]);
                }
            }
        })
        .catch(err => console.log(err.stack));
}