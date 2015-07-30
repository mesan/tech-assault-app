export default function disconnectEventHandler() {
    delete this.server.tokenSocketMap[this.socket.token];
}