import Events from '../../constants/Events';

import requestUserByToken from '../../util/requests/requestUserByToken';
import requestPostTurn from '../../util/requests/requestPostTurn';
import mapToMatchesPerUser from '../timed/mapToMatchesPerUser';

import { onTurnTimeout, onCountdownDecremented } from '../timed';

export default function onPerformTurn(turn) {
    const { socket, server } = this;
    const { token } = socket;
    const { tokenSocketMap, matchMap, matchIntervalMap } = server;

    let user;

    requestUserByToken(token)
        .then(userByToken => {
            user = userByToken;
            return requestPostTurn(user.id, turn);
        })
        .then(match => {
            const { matchId, users, finished: matchFinished, cardsToLoot, nextTurn } = match;

            const userIndex = users.map(user => user.id).indexOf(user.id);
            const opponentIndex = userIndex === 0 ? 1 : 0;

            const matchesPerUser = mapToMatchesPerUser(match);

            const emits = [];

            emits.push({ socket, userIndex });

            const userTokens = matchMap[matchId];
            const otherTokenIndex = userTokens.findIndex(userToken => userToken !== token);

            if (otherTokenIndex !== -1) {
                const otherToken = userTokens[otherTokenIndex];
                const opponentSocket = tokenSocketMap[otherToken];

                if (opponentSocket) {
                    emits.push({ socket: opponentSocket, userIndex: opponentIndex });
                }
            }

            for (let emit of emits) {
                emit.socket.emit(Events.turnPerformed, matchesPerUser[emit.userIndex]);
            }

            if (matchIntervalMap[matchId]) {
                clearInterval(matchIntervalMap[matchId]);
            }

            if (matchFinished) {
                for (let emit of emits) {
                    emit.socket.emit(Events.matchFinished, matchesPerUser[emit.userIndex]);
                }

                // If draw
                if (cardsToLoot.length === 0) {
                    delete matchMap[matchId];
                }
            } else {
                let countdown = 30;

                matchIntervalMap[matchId] = setInterval(() => {
                    countdown--;

                    const sockets = userTokens.map(token => {
                        return tokenSocketMap[token];
                    });

                    onCountdownDecremented.call(this, countdown, sockets);

                    if (countdown === 0) {
                        onTurnTimeout.call(this, 5, sockets, nextTurn);
                        clearInterval(matchIntervalMap[matchId]);
                    }
                }, 1000);
            }

            return match;
        })
        .catch(err => console.error(err.stack));
}