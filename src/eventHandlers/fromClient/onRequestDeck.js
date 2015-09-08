import requestUserByToken from '../../util/requests/requestUserByToken';
import requestPlayerDeck from '../../util/requests/requestPlayerDeck';

import Events from '../../constants/Events';

export default function onRequestDeck() {
    const { socket } = this;
    const { token } = socket;

    requestUserByToken(token)
        .then(user => {
            return requestPlayerDeck(user.id);
        })
        .then(playerDeck =>{
            const { deck, primaryDeck } = playerDeck;
            const deckToClient = { deck, primaryDeck };
            socket.emit(Events.deckReceived, deckToClient);
        })
        .catch(err => {
            console.log('Could not get player deck', err, err.stack);
        });
}