import React from 'react';

export default class Match extends React.Component {
	render() {

        const { users } = this.props.match;

		return (
			<div>
                <p>Battle!</p>
                <p>{users[0].name} <strong>VS</strong> {users[1].name}</p>
            </div>
		)
	}
	
}