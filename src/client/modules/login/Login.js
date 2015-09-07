import React from 'react';

export default class Login extends React.Component {
	
	render() {
		return (
			<section>
				<h1>Login</h1>
				<a href="/login?provider=twitter">Log in with Twitter</a>
			</section>
		);
	}
}