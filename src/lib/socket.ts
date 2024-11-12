import {io, Socket} from 'socket.io-client'

const socketUrl: string = "ws://localhost:4000"
const socket: Socket = io (socketUrl, {
    reconnectionDelayMax: 1000
})

export default socket