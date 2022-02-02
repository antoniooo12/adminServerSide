// const readline = require('readline');
import * as readline from "readline";
import {stdin, stdout} from 'process';

const express = require('express')
const rl = readline.createInterface({input: stdin, output: stdout, prompt: '>'});

import config = require('config')

const PORT = config.get('serverPort') || 4200
const fileUpload = require("express-fileupload")
const cors = require('cors')
const path = require('path')
import {openConnection, db} from "./db/dbSequelize";
import {productRouter} from './routes/productRouter.routes'
import {revertMigration, runMigrations} from "./db/migration";
import {stdin as input, stdout as output} from "process";
import {setAssociations} from "./db/Asociations/asociations";
import {createServer} from "http";
import {Server} from "socket.io";

import {ROOM_SET_USERS} from "./soket/rootSocket";
import {DATABASE_ACTIONS} from "./soket/databaseActions/databaseActions";
import {databaseService} from "./services/database/DatabaseService";

const app = express()
const httpServer = createServer(app);

const corsOptions = {
    origin: 'http://localhost:3030',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200
}
app.use(cors(corsOptions));

app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'files', 'static')))
app.use(fileUpload({}))

app.use(express.static(__dirname))
app.use(express.static(path.resolve(__dirname, 'build')))

app.use('/api/goods', productRouter)

export const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:3030",
    }
})


const start = async () => {
    try {
        // await sequelize.authenticate()
        // await sequelize.sync()
        await openConnection()
        await runMigrations()
        await setAssociations()
        // await sequelize.transaction()
        console.log('Соединение с БД было успешно установлено')
        httpServer.listen(PORT, () => {

            console.log(`server run on ${PORT}  `)
        })

    } catch (e) {
        console.log(e)
        console.log('Невозможно выполнить подключение к БД: ', e)
    }
}

start()
export type User = {
    name: string
}
export type id = number | string
export type Room = Map<id, User>
export type Rooms = Map<id, Room>


io.on('connection', async (socket) => {
    // ROOM_SET_USERS(socket)


    databaseService.getOrders()
        .then(orders => {
            console.log(orders)
            io.emit('WEB:UPDATE:ORDERS', orders)
        })
    DATABASE_ACTIONS(socket)

    // socket.on('ROOM:SET_USERS', async ({roomId, user}: { roomId: string, user: User }) => {
    //         if (!rooms.has(roomId)) {
    //             const newRoom: Room = new Map([[socket.id, user]])
    //             rooms.set(roomId, newRoom)
    //         }
    //         console.log(io.sockets.adapter.rooms)
    //         await socket.join(roomId)
    //         console.log(io.sockets.adapter.rooms)
    //         const users = rooms.get(roomId)
    //     }
    // )
})

rl.on('line', async (command) => {
    if (command === 'revertMigration') {
        rl.question('input migration ', async (migration) => {
            await revertMigration(migration)
        })

    } else if (command === 'runMigrations') {
        await runMigrations()
    }
})


module.exports = app



