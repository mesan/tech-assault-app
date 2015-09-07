import requestUserByToken from '../../util/requests/requestUserByToken';
import requestPutPlayerPrimaryDeck from '../../util/requests/requestPutPlayerPrimaryDeck';

import Events from '../../constants/Events';

export default function onUpdatePrimaryDeck({ primaryDeck }) {
    const { socket } = this;
    const { token } = socket;

    requestUserByToken(token)
        .then(user => {
            console.log(primaryDeck);
            return requestPutPlayerPrimaryDeck(user.id, primaryDeck);
        })
        .then(deck => {
            const { primaryDeck } = deck;
        })
        .catch((err) => {
            console.error('Could not update player primary deck', err, err.stack);
        });
}