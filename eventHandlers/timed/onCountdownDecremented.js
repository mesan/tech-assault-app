import Events from '../../constants/Events';

export default function onCountdownDecremented(countdown, sockets) {
    for (let socket of sockets) {
        socket.emit(Events.turnCountdown, countdown);
    }
}