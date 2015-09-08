import React from 'react';
import Spinner from '../common/Spinner';

export default class Splash extends React.Component {

    render() {
        return (
            <Spinner text="Bootstrapping..." />
        );
    }
}