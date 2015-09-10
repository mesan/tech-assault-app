import React from 'react';

import Events from '../../../constants/Events';

export default class PresenterApp extends React.Component {

    constructor(props) {
        super(props);

        const currentPageId = 'presenterSplash';

        this.state = { currentPageId };
    }

    componentDidMount() {
        const { socket } = this.props;

        socket.on(Events.highscoreUpdated, (highscore) => {

            setTimeout(() => socket.emit(Events.highscores, this.props.userToken), 2000);
        });

        socket.on(Events.highscoresReceived, (highscore) => {
            const currentPageId = this.state.currentPageId === 'presenterHome' ? 'presenterHome' : 'presenterScreens';
            this.setState({ highscore, currentPageId });
        });

        setInterval(() => {
            const currentPageId = this.state.currentPageId === 'presenterHome' ? 'presenterScreens' : 'presenterHome';
            this.setState({ currentPageId });
        }, 10000);

        socket.emit(Events.highscores);
    }

    changeCurrentPage(newCurrentPageId) {
        const currentPageId = !this.props.userToken ? 'login' : newCurrentPageId;
        this.setState({ currentPageId });
    }

    render() {
        const currentPage = this.props.modules[this.state.currentPageId];

        const pageProps = {
            highscore: this.state.highscore
        };

        return (
            <div>
                <div className="app-banner"></div>
                <h1 className="text-center highscore-header">
                    <span className="green">Want to Play?</span>
                    &nbsp;Go to <a className="link" href="http://play.mesan.no">play.mesan.no</a>
                </h1>
                {React.createElement(currentPage, pageProps)}
            </div>
        );
    }
}