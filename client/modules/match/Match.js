import React from 'react';

export default class Match extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.gameController.init(this.props.match);
        this.props.gameController.onCardPlaced(this.submit.bind(this));
    }

    componentDidUpdate() {
        this.props.gameController.updateState(this.props.match);
    }

	render() {
        const { players, board, primaryDeck } = this.props.match;

        console.log(this.props.match);

        const tiles = board.map((tile, index) => tile === 0 ? index : false).filter(tile => tile !== false);

		return (
			<div>
                <div id="game"></div>
                <p>Battle!</p>
                <p>{players[0].name} <strong>VS</strong> {players[1].name}</p>
                <button onClick={this.submit.bind(this)}>Perform turn</button>
                <ul>
                    {primaryDeck.map(card => <li id={card.id} onClick={this.selectCard.bind(this)}>{card.id}</li>)}
                </ul>
                <ul>
                    {tiles.map((tile) => <li id={tile} onClick={this.selectPosition.bind(this)}>{tile}</li>)}
                </ul>
            </div>
		)
	}

    selectCard(event) {
        const card = event.target.id;
        this.setState({ card });
    }

    selectPosition(event) {
        const position = parseInt(event.target.id, 10);
        this.setState({ position });
    }

    submit(select) {
        this.props.onPerformTurn(select.cardId, select.cardPosition);
    }

	
}