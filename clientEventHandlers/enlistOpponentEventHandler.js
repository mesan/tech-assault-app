import requestPostEnlistment from '../util/requests/requestPostEnlistment';

export default function enlistOpponentEventHandler() {
    requestPostEnlistment(this.socket.token)
        .catch((err) => {
            console.log(err.stack);
        });
}