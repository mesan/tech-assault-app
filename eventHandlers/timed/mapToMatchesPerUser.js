export default function mapToMatchesPerUser(match) {
    const { board, nextTurn, score, actions, cards, users } = match;
    const [player1primaryDeck, player2primaryDeck] = match.primaryDecks;

    const match1 = {
        users,
        board,
        nextTurn,
        score,
        actions,
        cards,
        primaryDeck: player1primaryDeck,
        opponentPrimaryDeckSize: player2primaryDeck.length
    };

    const match2 = {
        users,
        board,
        nextTurn,
        score,
        actions,
        cards,
        primaryDeck: player2primaryDeck,
        opponentPrimaryDeckSize: player1primaryDeck.length
    };

    return [match1, match2];
}