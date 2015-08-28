import React from 'react';
import Events from '../../../constants/Events';

export default class App extends React.Component {
    
    constructor(props) {
        super(props);
        
        const currentPageId = 'splash';
        const user = {};

        this.state = { currentPageId, user };
    }
    
    componentDidMount() {
        const { socket } = this.props;
        
        socket.on(Events.loginRequested, () => {
           socket.emit(Events.login, this.props.userToken); 
        }.bind(this));
        
        socket.on(Events.loginAccepted, (user) => {
            console.log('loginacc', user);
            this.changeCurrentPage('home');
            this.setState({ user });
        }.bind(this));
        
        socket.on(Events.loginRefused, (reason) => {
            console.log('loginrefused', reason);
            this.changeCurrentPage('login');
        }.bind(this));

        socket.on(Events.matchStarted, (gameObject) => {
            this.changeCurrentPage('battle');
        }.bind(this));
    }
    
    componentWillUnmount() { }
    
    changeCurrentPage(newCurrentPageId) {
        if (this.props.userToken === null) {
            this.setState({ currentPageId: 'login' });
        } else {
            this.setState({ currentPageId: newCurrentPageId });
        }
    }
    
    goToHome(event) {
        event.preventDefault();
        this.changeCurrentPage('home');
    }
    
        
    enlist() {
        const { socket } = this.props;

        console.log('enlist');

        socket.emit(Events.playerEnlisted);
    }

    render() {
        const currentPage = this.props.modules[this.state.currentPageId];
        const { user } = this.state;
        const enlist = this.enlist.bind(this);

        const pageProps = {
            user,
            enlist,
            changeCurrentPage: this.changeCurrentPage.bind(this),
            userToken: this.props.userToken
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