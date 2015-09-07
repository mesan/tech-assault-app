import requestPostLootTimeout from '../../util/requests/requestPostLootTimeout';
import mapToMatchesPerUser from './mapToMatchesPerUser';
import Events from '../../constants/Events';

export default function onLootTimeout(sockets, initialCountdown, nextTurn) {
    requestPostLootTimeout(nextTurn)
        .then((match) => {
            const matchEvents  = mapToMatchesPerUser(match);

            for (let i = 0 ; i < sockets.length; i++) {
                const socket = sockets[i];

                if (socket) {
                    socket.emit(Events.lootTimedOut, matchEvents[i]);
                }
            }
        })
        .catch(err => console.error('Could not timeout loot', err, err.stack));
}