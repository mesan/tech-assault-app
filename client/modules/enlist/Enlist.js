import React from 'react';

export default class Enlist extends React.Component {
	
	constructor(props) {
		super(props);
		
		this.props.enlist();
	}
	
	render() {
		return (
			<img src="images/loading.gif" />
		)
	}
	
}