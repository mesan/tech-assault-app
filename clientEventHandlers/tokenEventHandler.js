export default function tokenEventHandler(userToken) {
    this.server.tokenSocketMap[userToken] = this.socket;
    this.socket.token = userToken;
}