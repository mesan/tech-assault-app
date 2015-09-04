import React from 'react';

export default class Card extends React.Component {

    render() {
        const { card } = this.props;

        const style = {
            'backgroundImage': `url(${card.image}), url(assets/card-background.png)`,
            'backgroundSize': '60%, 100%'
        };

        const classes = ['card', 'card-player'];

        if (this.props.selected) {
            classes.push('card-selected');
        }

        return (
            <div className={classes.join(' ')} onClick={this.handleClick.bind(this)} style={style}>
                <div className="attack">
                    <span>{card.attack}</span>
                </div>
                <div className="defense">
                    <span>{card.defense}</span>
                </div>
                <div className={`arrows arrows-${parseInt(card.arrows.join(""), 2)}`}></div>
            </div>
        );
    }

    handleClick(event) {
        event.preventDefault();

        this.props.onSelect(this.props.card.id);
    }

}