import Events from '../../constants/Events';

import requestUserByToken from '../../util/requests/requestUserByToken';
import requestPostTurn from '../../util/requests/requestPostTurn';
import mapToMatchesPerUser from '../timed/mapToMatchesPerUser';

export default function onPerformTurn(turn) {
    const { socket, server } = this;
    const { token } = socket;
    const { tokenSocketMap, matchMap } = server;

    let user;

    requestUserByToken(token)
        .then(userByToken => {
            user = userByToken;
            return requestPostTurn(user.id, turn);
        })
        .then(match => {
            const userIndex = match.users.map(user => user.id).indexOf(user.id);
            const opponentIndex = userIndex === 0 ? 1 : 0;

            const matchesPerUser = mapToMatchesPerUser(match);

            const emits = [];

            emits.push({ socket, userIndex });

            const userTokens = matchMap[match.matchId];
            const otherTokens = userTokens.filter(userToken => userToken !== token);

            if (otherTokens) {
                const otherToken = otherTokens[0];
                const opponentSocket = tokenSocketMap[otherToken];

                if (opponentSocket) {
                    emits.push({ socket: opponentSocket, userIndex: opponentIndex });
                }
            }

            for (let emit of emits) {
                const { socket, userIndex } = emit;
                socket.emit(Events.turnPerformed, matchesPerUser[userIndex]);
            }

            if (match.finished) {
                for (let emit of emits) {
                    const { socket, userIndex } = emit;
                    socket.emit(Events.matchFinished, matchesPerUser[userIndex]);
                }
            }

            return match;
        })
        .then(match => {
            console.log(match.finished);
        })
        .catch(err => console.error(err.stack));
}