import React from 'react';

export default class Highscore extends React.Component {

	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.props.onHighscores();
	}

	render() {
		const { highscores } = this.props;

		if (!highscores) {
			return <div>Loading...</div>;
		}

		return (
			<section>
				<h1>Highscores:</h1>
				{highscores.map(this.renderScore.bind(this))}
			</section>
		);
	}

	renderScore(playerScore) {
		const { playerName, rank, score } = playerScore;

		return (
			<div class="rank-item">
				<img src= />
				{playerName}
				{rank}st / {score}p
			</div>
		);
	}
}