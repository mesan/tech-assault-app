import Events from '../../constants/Events';

export default function onCountdownDecremented(sockets, secondsLeft) {
    for (let socket of sockets) {
        if (!socket) {
            continue;
        }

        socket.emit(Events.turnCountdown, { secondsLeft });
    }
}