import requestHighscores from '../../util/requests/requestHighscores';

import Events from '../../constants/Events';

export default function onHighscores() {
    requestHighscores()
        .catch((err) => {
            console.error('Could not get highscores', err, err.stack);
        });
}
