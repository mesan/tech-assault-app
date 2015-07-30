import Events from '../../constants/Events';

export default function loginRequestedEventHandler() {
    this.emit(Events.login, this.token);
}