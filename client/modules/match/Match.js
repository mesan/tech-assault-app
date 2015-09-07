import React from 'react';
import MatchBoard from './MatchBoard';
import Countdown from './Countdown';

export default class Match extends React.Component {

	render() {
		return (
			<div>
                <Countdown secondsLeft={this.props.secondsLeft} />
                <MatchBoard
                    match={this.props.match}
                    gameController={this.props.gameController}
                    onPerformTurn={this.props.onPerformTurn} />
            </div>
		);
	}

	
}