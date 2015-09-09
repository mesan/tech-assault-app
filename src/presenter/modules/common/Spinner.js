import React from 'react';

export default class Spinner extends React.Component {

    render() {
        return (
            <div className="spinner">
                <div className="spinner-text">{this.props.text}</div>
                <div className="loading">
                    <div className="bullet"></div>
                    <div className="bullet"></div>
                    <div className="bullet"></div>
                    <div className="bullet"></div>
                </div>
            </div>
        );
    }


}