import React from 'react';

export default class Match extends React.Component {

    componentDidMount() {
        this.props.gameController.init(this.props.match);
        this.props.gameController.onCardPlaced(this.submit.bind(this));
    }

    componentDidUpdate() {
        this.props.gameController.updateState(this.props.match);
    }

    shouldComponentUpdate(nextProps) {
        return nextProps.match !== this.props.match;
    }

    render() {
        const { players, board, primaryDeck } = this.props.match;

        const tiles = board.map((tile, index) => tile === 0 ? index : false).filter(tile => tile !== false);

        return (
            <div>
                <div id="game"></div>
            </div>
        )
    }

    selectCard(event) {
        const card = event.target.id;
        this.setState({ card });
    }

    selectPosition(event) {
        const position = parseInt(event.target.id, 10);
        this.setState({ position });
    }

    submit(select) {
        if (this.props.match.isPlayerTurn) {
            this.props.onPerformTurn(select.cardId, select.cardPosition);
        }
    }


}