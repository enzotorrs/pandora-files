import config from "../config"
import io from 'socket.io-client'

const socket = io(config["socket-server-url"])

export function getSocketId() {
    return socket.id
}

export function onFinishProcess(callback: any) {
    socket.on("finish_process", callback)
}

