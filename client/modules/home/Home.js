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
	
	render() {
        const buttons = [
            { key: 'battle', title: 'Play now', clickHandler: this.goToHome.bind(this) },
            { key: 'highscore', title: 'High Scores', clickHandler: this.goToHighscores.bind(this) }
        ];
        
        const buttonElements = buttons.map(({ clickHandler, title, key }) => {
            return <button key={key} onClick={clickHandler} >{title}</button>;
        });
		
		return (
			<section className="page-home">
				<h1>Home</h1>
				<p>Welcome, {this.props.userToken}</p>
				<div className="buttons">
					{buttonElements}
				</div>
			</section>
		);
	}
	
	
}