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
			<section className="page page-highscore">
				<h1>Highscores:</h1>
				{highscores.map(this.renderScore.bind(this))}
				<button className="btn" onClick={this.handleBackClick.bind(this)}>Back</button>
			</section>
		);
	}

	handleBackClick(event) {
		event.preventDefault();

		this.props.onExitHighscore();
	}

	renderScore(playerScore) {

		const userAvatar = playerScore.avatar ? playerScore.avatar.large : 'http://gjesteurl';

		const { playerName, rank, score } = playerScore;

		let rankSuffix = this.findRankSuffix(rank);

		return (
			<div className="highscore-item" key={rank}>
				<img className="highscore-avatar" src={userAvatar} />
				<h5>{playerName}</h5>
				<p>
					<span className="highscore-rank">{rank}</span>{rankSuffix} / <span className="highscore-score">{score}</span>p
				</p>
			</div>
		);
	}

	findRankSuffix(rank) {
		let rankSuffix;

		switch(rank) {
			case 1 :
				rankSuffix = 'st';
				break;
			case 2 :
				rankSuffix = 'nd';
				break;
			case 3 :
				rankSuffix = 'rd';
				break;
			default :
				rankSuffix = 'th';
		}

		return rankSuffix;
	}
}