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
    
    goToEnlistPage() {
        this.props.changeCurrentPage('enlist');
    }
	
	render() {
        const buttons = [
            { key: 'enlist', title: 'Play', clickHandler: this.goToEnlistPage.bind(this) },
            { key: 'highscore', title: 'High Scores', clickHandler: this.goToHighscores.bind(this) },
        ];

        const { user } = this.props;

        const userName = user && user.name ? user.name : 'Gjest';
        const userAvatar = user && user.avatar ? user.avatar.large : 'http://gjesteurl';
        
        const buttonElements = buttons.map(({ clickHandler, title, key }) => {
            return <button key={key} onClick={clickHandler} >{title}</button>;
        });
		
		return (
			<section className="page-home">
				<h1>Home</h1>
				<p>Welcome, {userName}</p>
                <img src={userAvatar} />
				<div className="buttons">
					{buttonElements}
				</div>
			</section>
		);
	}
	
	
}