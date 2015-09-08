import React from 'react';

export default class Login extends React.Component {
	
	render() {
		return (
			<section className="page-login">
				<h1>Login</h1>
				<img className="login-twitter-image" src="images/twitter.png" />
				<a className="btn" href="/login?provider=twitter">Log in with Twitter</a>
			</section>
		);
	}
}