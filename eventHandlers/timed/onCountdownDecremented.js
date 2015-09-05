import Events from '../../constants/Events';

export default function onCountdownDecremented(countdown, emits) {
    for (let emit of emits) {
        emit.socket.emit(Events.turnCountdown, countdown);
    }
}