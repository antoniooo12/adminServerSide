import {io, Room, Rooms, User} from "../../index";
import {Socket} from "socket.io";
import {DefaultEventsMap} from "socket.io/dist/typed-events";

let rooms: Rooms = new Map()


export function DATABASE_ACTIONS(socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) {
    socket.on('ADD_ORDER', (message) => {
        io.sockets.in('1').emit('ADD_ORDER', 'ADD_OR')
        console.log(message)
    })
}

