import requestPostEnlistment from '../../util/requests/requestPostEnlistment';

export default function onPlayerEnlisted() {
    requestPostEnlistment(this.socket.token)
        .catch((err) => {
            console.log(err.stack);
        });
}