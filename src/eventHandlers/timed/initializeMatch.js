import requestCreateMatch from '../../util/requests/requestCreateMatch';
import requestUserByToken from '../../util/requests/requestUserByToken';

export default function initializeMatch(userToken1, userToken2) {

    let users;

    return Promise.all([
        requestUserByToken(userToken1),
        requestUserByToken(userToken2)
        ])
        .then(([user1, user2]) => {
            users = [user1, user2];

            return requestCreateMatch(user1, user2);
        })
        .then((match) => {
            match.users = users;
            return match;
        });
}