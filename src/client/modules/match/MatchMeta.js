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
        return (
            <div className={`match-meta-player match-meta-player-${isPlayer ? 'you' : 'opponent'}`}>
                <img className="match-meta-player-avatar" src={player.avatar} />
                <span className="match-meta-player-name">{player.name}</span>
                <span className="match-meta-player-rank">{player.highscore.rank}</span>
                <span className="match-meta-player-score">{player.highscore.score}</span>
            </div>
        );
    }


}