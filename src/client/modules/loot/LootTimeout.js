import React from 'react';

export default class LootTimeout extends React.Component {

    render() {
        const { winner } = this.props.match;

        const title = winner === true
            ? 'Oh No!'
            : 'Phew!';

        const text = winner === true
            ? 'You lost your opportunity to pick a card!'
            : 'You got your cards back!';

        return (
            <div>
                <h2>{title}</h2>
                {text}
                <p>Reason: Timeout</p>
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