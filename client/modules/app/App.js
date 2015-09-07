import React from 'react';
import Events from '../../../constants/Events';

import gameController from '../match/gameController';

export default class App extends React.Component {
    
    constructor(props) {
        super(props);

        const currentPageId = 'splash';
        const user = {};
        const match = undefined;
        const secondsLeft = undefined;
        const deck = undefined;

        this.state = { currentPageId, user, match, secondsLeft, deck };
    }
    
    componentDidMount() {
        const { socket } = this.props;
        
        socket.on(Events.loginRequested, () => {
           socket.emit(Events.login, this.props.userToken); 
        });
        
        socket.on(Events.loginAccepted, (user) => {
            console.log('loginacc', user);
            this.changeCurrentPage('home');
            this.setState({ user });
        });
        
        socket.on(Events.loginRefused, (reason) => {
            console.log('loginrefused', reason);
            this.changeCurrentPage('login');
        });

        socket.on(Events.deckReceived, deck => {
            this.setState({ deck });
        });

        socket.on(Events.matchStarted, (match) => {
            const currentPageId = 'match';
            this.setState({ currentPageId, match, secondsLeft: undefined });
        });

        socket.on(Events.matchFinished, (match) => {
            const setStateFunc = () => this.setState({currentPageId: 'loot', match});

            if (this.state.currentPageId === 'match' && !match.turnTimedOut) {
                gameController.getAnimationPromise().then(() => {
                    setTimeout(setStateFunc, 1000);
                });
            } else {
                setStateFunc();
            }
        });

        socket.on(Events.lootTimedOut, (match) => {
            this.setState({ currentPageId: 'lootTimeout', match });
        });

        socket.on(Events.turnPerformed, (match) => {
            const currentPageId = 'match';
            this.setState({ currentPageId, match });
        });

        socket.on(Events.turnCountdown, (countdown) => {
            this.setState({ secondsLeft: countdown.secondsLeft });
        });

        socket.on(Events.highscoresReceived, (highscores) => {
            this.setState({ highscores: highscores });
        });

        socket.on(Events.lootPerformed, (match) => {
            const setStateFunc = () => this.setState({currentPageId: 'looted', match});

            if (this.state.currentPageId === 'match' && !match.turnTimedOut) {
                gameController.getAnimationPromise().then(() => {
                    setTimeout(setStateFunc, 1000);
                });
            } else {
                setStateFunc();
            }
        });
    }
    
    changeCurrentPage(newCurrentPageId) {
        const currentPageId = !this.props.userToken ? 'login' : newCurrentPageId;
        this.setState({ currentPageId });
    }
    
    goToHome(event) {
        event.preventDefault();
        this.changeCurrentPage('home');
    }

    enlist() {
        const { socket } = this.props;

        socket.emit(Events.enlist);
    }

    requestDeck() {
        const { socket } = this.props;

        socket.emit(Events.requestDeck);
    }

    updatePrimaryDeck(newPrimaryDeck) {
        const { socket } = this.props;

        socket.emit(Events.updatePrimaryDeck, {
            primaryDeck: newPrimaryDeck
        });
    }

    highscores() {
        const { socket } = this.props;

        socket.emit(Events.highscores);
    }

    performTurn(cardId, cardPosition) {
        this.props.socket.emit(Events.performTurn, {
            cardId,
            cardPosition,
            actionType: 'cardPlaced'
        });
    }

    loot(cardId) {
        this.props.socket.emit(Events.loot, {
            cardId
        });
    }

    exitLoot() {
        this.changeCurrentPage('home');
    }

    render() {
        const currentPage = this.props.modules[this.state.currentPageId];
        const { user } = this.state;
        const onEnlist = this.enlist.bind(this);
        const onPerformTurn = this.performTurn.bind(this);
        const onLoot = this.loot.bind(this);
        const onExitLoot = this.exitLoot.bind(this);
        const onRequestDeck = this.requestDeck.bind(this);
        const onUpdatePrimaryDeck = this.updatePrimaryDeck.bind(this);
        const onHighscores = this.highscores.bind(this);

        const pageProps = {
            user,
            onEnlist,
            onUpdatePrimaryDeck,
            onPerformTurn,
            onLoot,
            onExitLoot,
            onRequestDeck,
            gameController,
            changeCurrentPage: this.changeCurrentPage.bind(this),
            userToken: this.props.userToken,
            match: this.state.match,
            deck: this.state.deck,
            cardsLooted: this.state.cardsLooted,
            secondsLeft: this.state.secondsLeft,
            onHighscores,
            highscores: this.state.highscores
        };

        return (
            <div>
                <h1>
                    <a href="" onClick={this.goToHome.bind(this)}>TechAssault</a>
                </h1>
                {React.createElement(currentPage, pageProps)}
            </div>
        );
    }
}