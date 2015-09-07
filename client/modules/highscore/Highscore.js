import React from 'react';

export default class Highscore extends React.Component {

	constructor(props) {
		super(props);

		this.props.highscores;
	}
	
	render() {
		return (
			<section>
				<h1>Highscores:</h1>

			</section>
		);
	}
}