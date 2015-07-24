import requestMatches from '../util/requests/requestMatches';
import Events from '../constants/Events';

export default function findMatchesEventHandler() {
    requestMatches()
        .then((matches) => {
            for (let i = 0; i < matches.length; i++) {
                const match = matches[i];

                const socketsInMatch = match.map(userToken => this.tokenSocketMap[userToken]);

                if (typeof socketsInMatch[0] === 'undefined') {
                    console.error(`Could not find socket with token ${match[0]}`);
                    continue;
                }

                if (typeof socketsInMatch[1] === 'undefined') {
                    console.error(`Could not find socket with token ${match[1]}`);
                    continue;
                }

                // TODO: Initialize match (generate game board, fetch players' primary decks, etc).

                socketsInMatch[0].emit(Events.opponentFound, socketsInMatch[1].token);
                socketsInMatch[1].emit(Events.opponentFound, socketsInMatch[0].token);
            }
        });
}