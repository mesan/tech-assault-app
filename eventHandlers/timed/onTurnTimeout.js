import Events from '../../constants/Events';

import requestPostTurnTimeout from '../../util/requests/requestPostTurnTimeout';
import mapToMatchesPerUser from './mapToMatchesPerUser';

import onCountdownDecremented from './onCountdownDecremented';
import onLootTimeout from './onLootTimeout';
import startCountdown from './startCountdown';

export default function onTurnTimeout(sockets, timeLimit, nextTurn, matchIntervalMap) {
    requestPostTurnTimeout(nextTurn)
        .then((match) => {
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

            if (eventType !== Events.lootPerformed && match.cardsToLoot.length > 0) {
                const initialCountdown = 30;
                matchIntervalMap[match.matchId] = startCountdown({
                    initialCountdown,
                    countdownDecrementedCallback(secondsLeft) {
                        onCountdownDecremented(sockets, secondsLeft);
                    },
                    turnTimeoutCallback(initialCountDown) {
                        clearInterval(matchIntervalMap[match.matchId]);
                        delete matchIntervalMap[match.matchId];

                        onLootTimeout(sockets, initialCountdown, nextTurn);
                    }
                });
            }
        })
        .catch(err => console.log(err.stack));
}