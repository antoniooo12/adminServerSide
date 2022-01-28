import {io, Room, Rooms, User} from "../index";
import {Socket} from "socket.io";
import {DefaultEventsMap} from "socket.io/dist/typed-events";

let rooms: Rooms = new Map()

export function ROOM_SET_USERS(socket:  Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) {
    socket.on('ROOM:SET_USERS', async ({roomId, user}: { roomId: string, user: User }) => {
            if (!rooms.has(roomId)) {
                const newRoom: Room = new Map([[socket.id, user]])
                rooms.set(roomId, newRoom)
            }
            console.log(io.sockets.adapter.rooms)
            await socket.join(roomId)
            console.log(io.sockets.adapter.rooms)
            const users = rooms.get(roomId)
        }
    )
}

