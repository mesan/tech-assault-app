import requestUserByToken from '../../util/requests/requestUserByToken';
import requestPostLootCard from '../../util/requests/requestPostLootCard';

export default function onLoot(loot) {
    const { socket, server } = this;
    const { token } = socket;

    const { cardId } = loot;

    requestUserByToken(token)
        .then(userByToken => {
            return requestPostLootCard(userByToken.id, cardId)
        })
        .catch(err => console.log(err));
}