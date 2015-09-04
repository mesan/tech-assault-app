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

        const lootButton = winner
            ? <button onClick={this.handleClick.bind(this)} disabled={lootButtonDisabled}>Loot!</button>
            : undefined;

        return (
            <div>
                You {winner ? 'Won' : 'Lost'}!
                {cardsToLoot.map(this.renderCard.bind(this))}
                {lootButton}
            </div>
        )
    }

    renderCard(card) {
        const selected = card.id === this.state.selectedCardId;

        return <Card key={card.id} onSelect={this.selectCard.bind(this)} selected={selected} card={card} />;
    }

    handleClick(event) {
        event.preventDefault();

        const lootPerformed = true;

        this.setState({ lootPerformed });

        this.props.onLoot(this.state.selectedCardId);
    }
}