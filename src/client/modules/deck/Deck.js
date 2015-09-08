import React from 'react';
import Card from '../common/Card';

export default class Deck extends React.Component {

    constructor(props) {
        super(props);

        this.state = { primaryDeck: [] };
    }

    componentDidMount() {
        this.props.onRequestDeck();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ primaryDeck : nextProps.deck.primaryDeck });
    }

    render() {
        if (!this.props.deck) {
            return <p>Loading...</p>;
        }

        const { deck, primaryDeck } = this.props.deck;

        return (
            <section className="page page-deck">
                <h1>Your Deck</h1>
                <p>Choose your primary deck (5 cards) by clicking on each individual card.</p>
                <button className="btn btn" onClick={this.handleBackClick.bind(this)}>Back</button>

                <div className="deck">
                    {deck.map(this.renderCard.bind(this))}
                </div>

                <button className="btn" onClick={this.handleBackClick.bind(this)}>Back</button>
            </section>
        );
    }

    handleBackClick(event) {
        event.preventDefault();

        this.props.onExitDeck();
    }

    renderCard(card) {
        const className =
            this.state.primaryDeck.findIndex(cardId => cardId === card.id) > -1
            ? 'card-primary'
            : undefined;

        return <Card
            key={card.id}
            onSelect={this.selectCard.bind(this)}
            selected={false}
            card={card}
            className={`card-in-grid ${className}`} />;
    }

    selectCard(cardId) {
        const cardIndex = this.state.primaryDeck.findIndex(primaryCardId => primaryCardId === cardId);
        const found = cardIndex > -1;

        const primaryDeckCopy = this.state.primaryDeck.slice();

        if (found) {
            primaryDeckCopy.splice(cardIndex, 1);
            this.setState({ primaryDeck: primaryDeckCopy });
            return;
        }

        if (this.state.primaryDeck.length >= 5) {
            return;
        }

        primaryDeckCopy.push(cardId);
        this.setState({ primaryDeck: primaryDeckCopy });

        if (primaryDeckCopy.length === 5) {
            this.props.onUpdatePrimaryDeck(primaryDeckCopy);
        }
    }
}