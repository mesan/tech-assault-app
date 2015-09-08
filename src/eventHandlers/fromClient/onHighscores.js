import requestHighscores from '../../util/requests/requestHighscores';

import Events from '../../constants/Events';

export default function onHighscores() {
    const { socket } = this;

    requestHighscores()
        .then((highscores) => {
            socket.emit(Events.highscoresReceived, highscores);
        })
        .catch((err) => {
            console.error('Could not get highscores', err, err.stack);
        });
}
