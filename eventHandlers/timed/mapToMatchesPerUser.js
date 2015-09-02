export default function mapToMatchesPerUser(match) {
    const { board, nextTurn, score, actions, cards, users, cardsToLoot } = match;
    const [ player1PrimaryDeck, player2PrimaryDeck ] = match.primaryDecks;
    const [ user1, user2 ] = users;

    const players = users.map((user, index) => {
        return {
            name: user.name,
            avatar: user.avatar.large,
            score: score[index]
        };
    });

    players[0].score = score[0];
    players[1].score = score[1];

    const flatActions = [];

    if (actions.length > 0) {
        const action = actions.pop();

        const events = action.events;

        action.events = undefined;

        flatActions.unshift(action);

        for (let event of events) {
            flatActions.push(event);
        }
    }

    let winner;

    if (match.finished) {
        winner = score[0] > score[1] ? user1.id : user2.id;
    }

    const match1 = {
        players,
        board,
        isPlayerTurn: nextTurn === user1.id,
        actions: flatActions.map(actionMapper(user1.id)),
        cards: cards.map(cardMapper(user1.id)),
        primaryDeck: player1PrimaryDeck.map(cardMapper(user1.id)),
        opponentPrimaryDeck: player2PrimaryDeck.map(card => card.id),
        winner: winner === user1.id,
        cardsToLoot
    };

    const match2 = {
        players,
        board,
        isPlayerTurn: !match1.isPlayerTurn,
        actions: flatActions.map(actionMapper(user2.id)),
        cards: cards.map(cardMapper(user2.id)),
        primaryDeck: player2PrimaryDeck.map(cardMapper(user2.id)),
        opponentPrimaryDeck: player1PrimaryDeck.map(card => card.id),
        winner: winner === user2.id,
        cardsToLoot
    };

    return [match1, match2];
}

function cardMapper(userId) {
    return ({ arrows, attack, defense, id, name, owner, image }) => {
        const isPlayerOwned = !owner || owner === userId;

        return { arrows, attack, defense, id, name, image, isPlayerOwned };
    };
}

function actionMapper(userId) {
    return action => {
        if (!action.newOwner && !action.player) {
            return action;
        }

        const copiedAction = Object.keys(action).reduce((obj, property) => {
            obj[property] = action[property];
            return obj;
        }, {});

        const isPlayerOwned = copiedAction.newOwner === userId || copiedAction.player === userId;

        copiedAction.isPlayerOwned = isPlayerOwned;

        return copiedAction;
    };
}