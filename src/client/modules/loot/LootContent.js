import React from 'react';
import Card from '../common/Card';

export default class LootContent extends React.Component {

    constructor(props) {
        super(props);
        this.state = { selectedCardId: undefined, lootPerformed: false };
    }

    selectCard(selectedCardId) {
        this.setState({ selectedCardId });
    }

    isWinnerAndHasCardsToLoot() {
        const { cardsToLoot, winner } = this.props.match;

        return cardsToLoot && cardsToLoot.length > 0 && winner === true;
    }

    isDrawOrLoserOrHasNoCardsToLoot() {
        const { winner, cardsToLoot } = this.props.match;
        return winner === false || winner === 'N/A' || (!cardsToLoot || cardsToLoot.length === 0);
    }

    render() {
        const { winner, cardsToLoot, cards, turnTimedOut } = this.props.match;

        const lootButtonDisabled = this.state.lootPerformed || typeof this.state.selectedCardId === 'undefined';

        const lootButton = this.isWinnerAndHasCardsToLoot()
            ? <button className="btn" onClick={this.handleLootClick.bind(this)} disabled={lootButtonDisabled}>Loot!</button>
            : undefined;

        const backButton = this.isDrawOrLoserOrHasNoCardsToLoot()
            ? <button className="btn" onClick={this.handleBackClick.bind(this)}>Back</button>
            : undefined;

        const title = winner === 'N/A'
            ? 'It\'s a Draw!'
            : winner === true
            ? 'You Won!'
            : 'You Lost!';

        const text = !cardsToLoot || cardsToLoot.length === 0
            ? undefined
            : winner === true
            ? <p>Pick a card:</p>
            : <p>Waiting for opponent to pick a card...</p>;

        const reason = turnTimedOut ? <p>Reason: Timeout</p> : undefined;

        return (
            <div>
                <h1>{title}</h1>
                {reason}
                {text}
                <div className="cards-to-loot">
                    {cardsToLoot.map(this.renderCard.bind(this))}
                </div>
                {lootButton}
                {backButton}
            </div>
        );
    }

    renderCard(card) {
        const selected = card.id === this.state.selectedCardId;

        return <Card key={card.id} onSelect={this.selectCard.bind(this)} selected={selected} card={card} />;
    }

    handleBackClick(event) {
        event.preventDefault();

        this.props.onExitLoot();
    }

    handleLootClick(event) {
        event.preventDefault();

        const lootPerformed = true;

        this.setState({ lootPerformed });

        this.props.onLoot(this.state.selectedCardId);
    }
}