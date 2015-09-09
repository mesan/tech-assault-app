import React from 'react';

export default class PresenterHome extends React.Component {

    render() {
        const { highscore } = this.props;

        return (
            <section className="page page-presenter-home">
                <h1 className="text-center highscore-header">
                    Want to Play? Visit: <a className="link" href="http://play.mesan.no">play.mesan.no</a>
                </h1>
                <ul className="highscore-list">
                    {highscore.map(this.renderHighscore.bind(this))}
                </ul>
            </section>
        );
    }

    renderHighscore(playerScore, index) {
        const userAvatar = playerScore.avatar ? playerScore.avatar.large : 'http://gjesteurl';

        const { playerName, rank, score } = playerScore;

        let rankSuffix = this.findRankSuffix(rank);

        const className = index === 0 ? 'highscore-first' : '';

        return (
            <div className={`highscore-item ${className}`} key={'' + rank + index}>
                <img className="avatar highscore-avatar" src={userAvatar} />
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