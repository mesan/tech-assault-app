import requestUserByToken from '../../util/requests/requestUserByToken';
import requestPostLootCard from '../../util/requests/requestPostLootCard';
import Events from '../../constants/Events';

import mapToMatchesPerUser from '../timed/mapToMatchesPerUser';

export default function onLoot(loot) {
    const { socket, server } = this;
    const { matchMap, tokenSocketMap, matchIntervalMap } = server;
    const { token } = socket;

    const { cardId } = loot;

    requestUserByToken(token)
        .then(userByToken => {
            return requestPostLootCard(userByToken.id, cardId)
        })
        .then(match => {
            clearInterval(matchIntervalMap[match.matchId]);
            delete matchIntervalMap[match.matchId];

            const { cards, cardsLooted, matchId } = match;

            const userTokens = matchMap[matchId];

            const matchEvents = mapToMatchesPerUser(match);

            for (let i = 0; i < userTokens.length; i++) {
                const userSocket = tokenSocketMap[userTokens[i]];

                if (userSocket) {
                    userSocket.emit(Events.lootPerformed, matchEvents[i]);
                }
            }

            socket.broadcast.emit(Events.highscoreUpdated);

            delete matchMap[matchId];
        })
        .catch(err => console.error('Could not perform loot', err, err.stack));
}