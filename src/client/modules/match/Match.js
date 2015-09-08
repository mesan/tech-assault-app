import React from 'react';
import MatchBoard from './MatchBoard';
import MatchMeta from './MatchMeta';
import Countdown from '../common/Countdown';

export default class Match extends React.Component {

	render() {

		return (
			<div>
                <Countdown secondsLeft={this.props.secondsLeft} />
                <MatchMeta
                    players={this.props.match.players}
                    user={this.props.user}
                    isPlayerTurn={this.props.match.isPlayerTurn} />
                <MatchBoard
                    match={this.props.match}
                    gameController={this.props.gameController}
                    onPerformTurn={this.props.onPerformTurn} />
            </div>
		);
	}

	
}