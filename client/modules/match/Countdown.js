import React from 'react';
import MatchBoard from './MatchBoard';

export default class Countdown extends React.Component {

    render() {
        if (this.props.secondsLeft > 10) {
            return <span />;
        }

        return (
            <div className="countdown">{this.props.secondsLeft}</div>
        );
    }


}