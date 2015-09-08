import React from 'react';
import Spinner from '../common/Spinner';

export default class Enlist extends React.Component {
	
	constructor(props) {
		super(props);
	}

    componentDidMount() {
        this.props.onEnlist();
    }
	
	render() {
		return (
			<Spinner text="Waiting for opponent..." />
		);
	}
	
}