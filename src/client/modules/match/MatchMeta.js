import React from 'react';
import MatchBoard from './MatchBoard';
import MatchMeta from './MatchMeta';
import Countdown from '../common/Countdown';

export default class Match extends React.Component {

    render() {
        return (
            <div className="match-meta">
                <div className="match-meta-players">
                    {this.props.players.map(this.renderPlayer.bind(this))}
                </div>
            </div>
        );
    }

    renderPlayer(player, index) {
        const isPlayer = player.name === this.props.user.name;

        const lastDigit = parseInt((player.highscore.rank + '').split('').pop());

        const suffix = lastDigit === 1 ? 'st' : lastDigit === 2 ? 'nd' : lastDigit === 3 ? 'rd' : 'th';

        return (
            <div className={`match-meta-player match-meta-player-${isPlayer ? 'you' : 'opponent'}`}>
                <img className="match-meta-player-avatar" src={player.avatar} />
                <div className="match-meta-player-info">
                    <span className="match-meta-player-name">{player.name}</span>
                    <span className="match-meta-player-rank">{player.highscore.rank}{suffix}</span>
                    <span className="match-meta-player-score">
                        {player.highscore.score}
                        <span className="match-meta-player-score-suffix">p</span>
                    </span>
                </div>
            </div>
        );
    }


}