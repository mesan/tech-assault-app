export default function mapToMatchesPerUser(match) {
    const { board, nextTurn, score, actions, cards, users, cardsToLoot, cardsLooted, winner, turnTimedOut } = match;
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

    let cardsToLootCopy = cardsToLoot ? cardsToLoot.slice() : undefined;
    let cardsLootedCopy = cardsLooted ? cardsLooted.slice() : undefined;

    let cardsToLootObjects;
    let cardsLootedObjects;

    if (cardsToLootCopy) {
        cardsToLootObjects = cardsToLootCopy.map(cardId => {
            return cards[cards.findIndex(card => card.id === cardId)];
        });
    }

    if (cardsLootedCopy) {
        cardsLootedObjects = cardsLootedCopy.map(cardId => {
            return cards[cards.findIndex(card => card.id === cardId)];
        });
    }

    const match1 = {
        players,
        board,
        isPlayerTurn: nextTurn === user1.id,
        actions: flatActions.map(actionMapper(user1.id)),
        cards: cards.map(cardMapper(user1.id)),
        primaryDeck: player1PrimaryDeck.map(cardMapper(user1.id)),
        opponentPrimaryDeck: player2PrimaryDeck.map(card => card.id),
        winner: winnerMapper(winner, user1.id),
        cardsToLoot: cardsToLootObjects ? cardsToLootObjects.map(cardMapper(user1.id)) : undefined,
        cardsLooted: cardsLootedObjects ? cardsLootedObjects.map(cardMapper(user1.id)) : undefined,
        turnTimedOut
    };

    const match2 = {
        players,
        board,
        isPlayerTurn: !match1.isPlayerTurn,
        actions: flatActions.map(actionMapper(user2.id)),
        cards: cards.map(cardMapper(user2.id)),
        primaryDeck: player2PrimaryDeck.map(cardMapper(user2.id)),
        opponentPrimaryDeck: player1PrimaryDeck.map(card => card.id),
        winner: winnerMapper(winner, user2.id),
        cardsToLoot: cardsToLootObjects ? cardsToLootObjects.map(cardMapper(user2.id)) : undefined,
        cardsLooted: cardsLootedObjects ? cardsLootedObjects.map(cardMapper(user2.id)) : undefined,
        turnTimedOut
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
            if (property === 'newOwner' || property === 'player') {
                return obj;
            }

            obj[property] = action[property];
            return obj;
        }, {});

        const isPlayerOwned = action.newOwner === userId || action.player === userId;

        copiedAction.isPlayerOwned = isPlayerOwned;

        return copiedAction;
    };
}

function winnerMapper(winner, userId) {
    if (!winner) {
        return undefined;
    }

    if (winner === 'N/A') {
        return winner;
    }

    return winner === userId;
}