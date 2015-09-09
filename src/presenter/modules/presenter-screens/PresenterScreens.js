import React from 'react';

export default class PresenterScreens extends React.Component {

    render() {
        return (
            <section className="page page-presenter-screens">
                <h1 className="text-center highscore-header">
                    Want to Play? Visit: <a className="link" href="http://play.mesan.no">play.mesan.no</a>
                </h1>
                <h1 className="in-your-face">Fight and win a SpaceRail!</h1>
                <img className="screen" src="screen1.png" alt="" />
            </section>
        );
    }
}