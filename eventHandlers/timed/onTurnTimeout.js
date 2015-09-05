import Events from '../../constants/Events';

export default function onTurnTimeout(timeLimit, emits) {
    for (let emit of emits) {
        emit.socket.emit(Events.turnDurationLimitExceeded);
    }
}