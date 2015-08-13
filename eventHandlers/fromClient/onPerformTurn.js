import Events from '../../constants/Events';

import requestUserByToken from '../../util/requests/requestUserByToken';
import requestPostTurn from '../../util/requests/requestPostTurn';
import mapToMatchesPerUser from '../timed/mapToMatchesPerUser';

export default function onPerformTurn(turn) {
    const { socket, server } = this;
    const { token } = socket;

    requestUserByToken(token)
        .then(user => requestPostTurn(user.id, turn))
        .then(match => {
            const [match1, match2] = mapToMatchesPerUser(match);

            const userTokens = server.matchMap[match.matchId];

            const [ otherToken ] = userTokens.filter(userToken => userToken !== token);

            const opponentSocket = server.tokenSocketMap[otherToken];

            const socket1 = userTokens.indexOf(token) === 0 ? socket : opponentSocket;
            const socket2 = socket1 === socket ? opponentSocket : socket;

            socket1.emit(Events.turnPerformed, match1);
            socket2.emit(Events.turnPerformed, match2);
        })
        .catch(err => console.error(err));
}