export default function onDisconnect() {
    delete this.server.tokenSocketMap[this.socket.token];
}