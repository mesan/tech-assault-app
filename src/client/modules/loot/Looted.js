import React from 'react';
import Card from '../common/Card';

export default class Looted extends React.Component {

    render() {
        const { winner, cardsLooted, turnTimedOut } = this.props.match;

        const title = winner === 'N/A'
            ? 'It\'s a Draw!'
            : winner === true
            ? 'You Won!'
            : 'You Lost!';

        const text = winner === true
            ? 'You acquired the following cards:'
            : 'You lost the following cards:';

        const reason = turnTimedOut ? <p>Reason: Timeout</p> : undefined;

        return (
            <section className="page page-looted">
                <h1>{title}</h1>
                {reason}
                <p>{text}</p>
                <div className="cards-to-loot">
                    {cardsLooted.map(this.renderCard.bind(this))}
                </div>
                <button className="btn" onClick={this.handleBackClick.bind(this)}>Back</button>
            </section>
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