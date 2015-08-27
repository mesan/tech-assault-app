import React from 'react';

export default class App extends React.Component {
    
    constructor(props) {
        super(props);
        
        console.log(`user token=${props.userToken}`);

        if (props.userToken !== null) {
            this.state = { currentPageId: 'home' };
        } else {
            this.state = { currentPageId: 'login' };
        }
        
    };
    
    changeCurrentPage(newCurrentPageId) {
        if (this.props.userToken === null) {
            this.setState({ currentPageId: 'login' });
        } else {
            this.setState({ currentPageId: newCurrentPageId });
        }
    };
    
    goToHome(event) {
        event.preventDefault();
        this.changeCurrentPage('home');
    };

    render() {
        const currentPage = this.props.modules[this.state.currentPageId];
        
        return (
            <div>
                <h1>
                    <a href="" onClick={this.goToHome.bind(this)}>TechAssault</a>
                </h1>
                {React.createElement(currentPage, { changeCurrentPage: this.changeCurrentPage.bind(this), userToken: this.props.userToken })}
            </div>
        );
    };
}