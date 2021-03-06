import React from 'react';
import Card from '../common/Card';
import Countdown from '../common/Countdown';
import LootContent from './LootContent';

export default class Loot extends React.Component {

    render() {
        return (
            <section className="page page-loot">
                <Countdown secondsLeft={this.props.secondsLeft} />
                <LootContent match={this.props.match} onExitLoot={this.props.onExitLoot} onLoot={this.props.onLoot} />
            </section>
        );
    }
}