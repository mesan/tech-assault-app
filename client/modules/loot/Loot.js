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
        console.log(this.props.match);

        const { winner, cardsToLoot, cards } = this.props.match;


        const lootButtonDisabled = this.state.lootPerformed || typeof this.state.selectedCardId === 'undefined';
        console.log(this.state.lootPerformed, this.state.selectedCardId, lootButtonDisabled);

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

        this.props.loot(this.state.selectedCardId);
    }
}