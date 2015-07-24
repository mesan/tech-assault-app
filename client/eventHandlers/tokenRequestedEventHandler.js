import Events from '../../constants/Events';

export default function tokenRequestedEventHandler() {
    this.emit(Events.tokenSent, this.token);
}