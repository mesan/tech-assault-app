import React from 'react';

export default class Login extends React.Component {
	
	render() {
		return (
			<section className="page page-login">
				<h1>Login</h1>
                <div className="login-provider">
                    <img className="login-twitter-image" src="images/twitter.png" />
                    <a className="btn" href="/login/twitter">Log in with Twitter</a>
                </div>
                <div className="login-provider">
                    <img className="login-facebook-image" src="images/facebook.png" />
                    <a className="btn" href="/login/facebook">Log in with Facebook</a>
                </div>
			</section>
		);
	}
}