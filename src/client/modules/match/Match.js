import React from 'react';
import MatchBoard from './MatchBoard';
import Countdown from '../common/Countdown';

export default class Match extends React.Component {

	render() {
		return (
			<div>
                <div>
                    <ul>
                        <li>Name: {this.props.match.players[0].name}</li>
                        <li>Score: {this.props.match.players[0].highscore.score}</li>
                        <li>Rank: {this.props.match.players[0].highscore.rank}</li>
                    </ul>
                    <ul>
                        <li>Name: {this.props.match.players[1].name}</li>
                        <li>Score: {this.props.match.players[1].highscore.score}</li>
                        <li>Rank: {this.props.match.players[1].highscore.rank}</li>
                    </ul>
                </div>
                <Countdown secondsLeft={this.props.secondsLeft} />
                <MatchBoard
                    match={this.props.match}
                    gameController={this.props.gameController}
                    onPerformTurn={this.props.onPerformTurn} />
            </div>
		);
	}

	
}