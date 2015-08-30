import React from 'react';

export default class Match extends React.Component {

    constructor(props) {
        super(props);

        const card = undefined;
        const position = undefined;

        this.state = { card, position };
    }

	render() {

        const { users, board, primaryDeck } = this.props.match;

        console.log(this.props.match);

        const tiles = board.map((tile, index) => tile === 0 ? index : false).filter(tile => tile !== false);

		return (
			<div>
                <p>Battle!</p>
                <p>{users[0].name} <strong>VS</strong> {users[1].name}</p>
                <p>Selected card:<br />{this.state.card}<br />Selected position:<br />{this.state.position}</p>
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
        const position = event.target.id;
        this.setState({ position });
    }

    submit() {
        this.props.performTurn(this.state.card, this.state.position);
    }

	
}