import React from 'react';

export default class PresenterScreens extends React.Component {

    render() {
        return (
            <section className="page page-presenter-screens">
                <h1 className="in-your-face">Fight and win a <span className="golden">SpaceRail</span>!</h1>
                <img className="screen" src="screen1.png" alt="" />
            </section>
        );
    }
}