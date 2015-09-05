import React from 'react';
import Card from '../common/Card';

export default class Loot extends React.Component {

    constructor(props) {
        super(props);
        this.state = { selectedCardId: undefined, lootPerformed: false };
    }

    selectCard(selectedCardId) {
        this.setState({ selectedCardId });
    }

    render() {
        const { winner, cardsToLoot, cards } = this.props.match;

        const lootButtonDisabled = this.state.lootPerformed || typeof this.state.selectedCardId === 'undefined';

        const lootButton = winner === true
            ? <button onClick={this.handleLootClick.bind(this)} disabled={lootButtonDisabled}>Loot!</button>
            : undefined;

        const backButton = winner === false || winner === 'N/A'
            ? <button onClick={this.handleBackClick.bind(this)}>Back</button>
            : undefined;

        const title = winner === 'N/A'
            ? 'It\'s a Draw!'
            : winner === true
                ? 'You Won!'
                : 'You Lost!';

        return (
            <div>
                {title}
                {cardsToLoot.map(this.renderCard.bind(this))}
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