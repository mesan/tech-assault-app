import Events from '../../constants/Events';

import requestUserByToken from '../../util/requests/requestUserByToken';
import requestActiveMatchByUserId from '../../util/requests/requestActiveMatchByUserId';
import mapToMatchesPerUser from '../timed/mapToMatchesPerUser';

export default function onLogin(userToken) {
    const { tokenSocketMap, matchMap } = this.server;

    let user;
    
    requestUserByToken(userToken)
        .then((userByToken) => {
            user = userByToken;

            tokenSocketMap[userToken] = this.socket;

            this.socket.token = userToken;

            const { id, name, avatar } = user;

            this.socket.emit(Events.loginAccepted, {id, name, avatar});

            return requestActiveMatchByUserId(id);
        })
        .then(match => {
            if (!match) {
                return;
            }

            const { matchId, cardsLooted } = match;

            const userIndex = match.users.map(user => user.id).indexOf(user.id);

            if (!matchMap[matchId]) {
                matchMap[matchId] = [];
            }

            matchMap[matchId][userIndex] = userToken;

            const matchesPerUser = mapToMatchesPerUser(match);

            const matchForUser = matchesPerUser[userIndex];

            const eventType = match.finished
                ? cardsLooted && cardsLooted.length > 0
                    ? Events.lootPerformed
                    : Events.matchFinished
                : Events.matchStarted;

            this.socket.emit(eventType, matchForUser);
        })
        .catch((err) => {
            if (err.status === 404) {
                this.socket.emit(Events.loginRefused, { reason: 'Not Found' });
                return;
            }

            console.error('Could not login user', err, err.stack);
        });
}