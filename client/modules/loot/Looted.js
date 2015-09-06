import React from 'react';
import Card from '../common/Card';

export default class Looted extends React.Component {

    render() {
        const { winner } = this.props.match;
        const { cardsLooted } = this.props;

        const title = winner === true
            ? 'You acquired the following cards:'
            : 'You lost the following cards:';

        return (
            <div>
                {title}
                {cardsLooted.map(this.renderCard.bind(this))}
                <button onClick={this.handleBackClick.bind(this)}>Back</button>
            </div>
        );
    }

    renderCard(card) {
        return <Card key={card.id} selected={false} card={card} />;
    }

    handleBackClick(event) {
        event.preventDefault();

        this.props.onExitLoot();
    }
}