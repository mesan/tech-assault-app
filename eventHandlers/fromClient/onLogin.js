import Events from '../../constants/Events';

import requestUserByToken from '../../util/requests/requestUserByToken';
import requestActiveMatchByUserId from '../../util/requests/requestActiveMatchByUserId';
import mapToMatchesPerUser from '../timed/mapToMatchesPerUser';

export default function onLogin(userToken) {
    const { tokenSocketMap, matchMap } = this.server;

    requestUserByToken(userToken)
        .then((user) => {
            tokenSocketMap[userToken] = this.socket;

            this.socket.token = userToken;

            const { id, name, avatar } = user;

            this.socket.emit(Events.loginAccepted, { id, name, avatar });

            requestActiveMatchByUserId(id)
                .then(match => {
                    const { matchId } = match;

                    const userIndex = match.users.map(user => user.id).indexOf(id);

                    if (!matchMap[matchId]) {
                        matchMap[matchId] = [];
                    }

                    matchMap[matchId][userIndex] = userToken;

                    return mapToMatchesPerUser(match);
                })
                .then((matchesPerUser) => {
                    const userIndex = matchesPerUser[0].users.map(user => user.id).indexOf(id);
                    const matchForUser = matchesPerUser[userIndex];

                    this.socket.emit(Events.matchStarted, matchForUser);
                })
                .catch(err => console.log(err));
        })
        .catch((err) => {
            if (err.status === 404) {
                this.socket.emit(Events.loginRefused, { reason: 'Not Found' });
                return;
            }

            console.log(err.stack);
        });
}