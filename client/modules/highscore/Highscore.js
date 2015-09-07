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

		const userAvatar = playerScore.avatar ? playerScore.avatar.large : 'http://gjesteurl';

		const { playerName, rank, score } = playerScore;

		return (
			<div>
				<img className="highscore-avatar" src={userAvatar} />
				<div><span className="highscore-name">{playerName}</span></div>
				<div><span className="highscore-rank">{rank}</span>st / <span className="highscore-score">{score}</span>p</div>
			</div>
		);
	}
}