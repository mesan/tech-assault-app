import React from 'react';

export default class Countdown extends React.Component {

    render() {
        const { secondsLeft } = this.props;

        if (typeof secondsLeft === 'undefined' || secondsLeft > 10 || secondsLeft === 0) {
            return <span />;
        }

        return (
            <div className="countdown">{this.props.secondsLeft}</div>
        );
    }

}