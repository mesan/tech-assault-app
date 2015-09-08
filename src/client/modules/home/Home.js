import React from 'react';

export default class Home extends React.Component {
    
    constructor(props) {
        super(props);
        
        this.userInfo = {
            token : props.userToken
        }
    };
    
    goToHome() {
        this.props.changeCurrentPage('home');
    }
    
    goToLogin() {
        this.props.changeCurrentPage('login');
    }
    
    goToHighscores() {
        this.props.changeCurrentPage('highscore');
    }

    goToDeck() {
        this.props.changeCurrentPage('deck');
    }
    
    goToEnlistPage() {
        this.props.changeCurrentPage('enlist');
    }
	
	render() {
        const buttons = [
            { key: 'enlist', title: 'Play', clickHandler: this.goToEnlistPage.bind(this) },
            { key: 'highscore', title: 'High Scores', clickHandler: this.goToHighscores.bind(this) },
            { key: 'deck', title: 'Choose Deck', clickHandler: this.goToDeck.bind(this) }
        ];

        const { user } = this.props;

        const userName = user && user.name ? user.name : 'Gjest';
        const userAvatar = user && user.avatar ? user.avatar.large : 'http://gjesteurl';
        
        const buttonElements = buttons.map(({ clickHandler, title, key }) => {
            return (
                <li className="home-button-list-item" key={key}>
                    <button className="btn home-button" onClick={clickHandler} >{title}</button>
                </li>
            );
        });
		
		return (
			<section className="page-home">
                <img className="avatar avatar-home" src={userAvatar} />
                <p className="welcome">Welcome, {userName}</p>
                <ul className="no-bullets home-button-list">{buttonElements}</ul>
			</section>
		);
	}
	
	
}