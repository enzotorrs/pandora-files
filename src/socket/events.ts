import config from "../config.json"
import io from 'socket.io-client'

const socket = io(config["socket-server-url"])
export function onFinishProcess(callback: any){
    socket.on("finish_process", callback)
}
