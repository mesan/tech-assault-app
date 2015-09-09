import React from 'react';
import Spinner from '../common/Spinner';

export default class PresenterSplash extends React.Component {

    render() {
        return (
            <Spinner text="Bootstrapping..." />
        );
    }
}