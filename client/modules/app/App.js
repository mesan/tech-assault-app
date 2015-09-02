import React from 'react';
import Events from '../../../constants/Events';

export default class App extends React.Component {
    
    constructor(props) {
        super(props);
        
        const currentPageId = 'splash';
        const user = {};
        const match = undefined;

        this.state = { currentPageId, user, match };
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

        socket.on(Events.matchStarted, (match) => {
            const currentPageId = 'match';
            this.setState({ currentPageId, match });
        });

        socket.on(Events.matchFinished, (match) => {
            const currentPageId = 'loot';
            this.setState({ currentPageId, match });
        });

        socket.on(Events.turnPerformed, (match) => {
            const currentPageId = 'match';
            this.setState({ currentPageId, match });
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

        socket.emit(Events.playerEnlisted);
    }

    performTurn(cardId, cardPosition) {
        this.props.socket.emit(Events.performTurn, {
            cardId,
            cardPosition,
            actionType: 'cardPlaced'
        });
    }

    render() {
        const currentPage = this.props.modules[this.state.currentPageId];
        const { user } = this.state;
        const enlist = this.enlist.bind(this);
        const performTurn = this.performTurn.bind(this);

        const pageProps = {
            user,
            enlist,
            performTurn,
            changeCurrentPage: this.changeCurrentPage.bind(this),
            userToken: this.props.userToken,
            match: this.state.match
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