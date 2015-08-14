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

            socket.emit(Events.turnPerformed, matchesPerUser[userIndex]);

            const userTokens = matchMap[match.matchId];

            const otherTokens = userTokens.filter(userToken => userToken !== token);

            if (!otherTokens) {
                console.log('No opponent to send turnPerformed event to.');
                return;
            }

            const otherToken = otherTokens[0];

            const opponentSocket = tokenSocketMap[otherToken];

            if (!opponentSocket) {
                console.log('No opponent to send turnPerformed event to.');
                return;
            }

            opponentSocket.emit(Events.turnPerformed, matchesPerUser[opponentIndex]);
        })
        .catch(err => console.error(err));
}