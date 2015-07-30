import Events from '../../constants/Events';

export default function onLoginRequested() {
    this.emit(Events.login, this.token);
}