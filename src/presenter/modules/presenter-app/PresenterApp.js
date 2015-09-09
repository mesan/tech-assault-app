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
            this.setState({ highscore: highscore, currentPageId: 'presenterHome' });
        });

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
                {React.createElement(currentPage, pageProps)}
            </div>
        );
    }
}