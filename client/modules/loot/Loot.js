import React from 'react';

export default class Loot extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    componentDidUpdate() {
    }

    render() {
        console.log(this.props.match);

        const { winner, cardsToLoot, cards } = this.props.match;

        return (
            <div>
                You {winner ? 'Won' : 'Lost'}!
                {cardsToLoot.map(card => {
                    const style = {
                        'backgroundImage': `url(${card.image}), url(assets/card-background.png)`,
                        'backgroundSize': '60%, 100%'
                    };

                    return (
                        <div className="card card-player" style={style}>
                            <div className="attack">
                                <span>{card.attack}</span>
                            </div>
                            <div className="defense">
                                <span>{card.defense}</span>
                            </div>
                            <div className={`arrows arrows-${parseInt(card.arrows.join(""), 2)}`}></div>
                        </div>
                    );
                })}
            </div>
        )
    }
}