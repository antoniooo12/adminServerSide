// const readline = require('readline');
import * as readline from "readline";
import {stdin, stdout} from 'process';
import {openConnection} from "./db/dbSequelize";
import {productRouter} from './routes/productRouter.routes'
import {revertMigration, runMigrations} from "./db/migration";
import {setAssociations} from "./db/Asociations/asociations";
import {createServer} from "http";
import {Server} from "socket.io";
import {DATABASE_ACTIONS} from "./soket/databaseActions/databaseActions";
import {sequelizeHooks} from "./db/sequelizeHooks";
import {DatabaseOrder} from "./services/database/databaseOrder/DatabaseOrder";

const express = require('express')
const rl = readline.createInterface({input: stdin, output: stdout, prompt: '>'});
import config = require('config');

const PORT = config.get('serverPort') || 4200
const fileUpload = require("express-fileupload")
const cors = require('cors')
const path = require('path')

const app = express()
const httpServer = createServer(app);

const corsOptions = {
    origin: 'http://localhost:3030',
    credentials: true,
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
        await openConnection()
        await runMigrations()
        await setAssociations()
        await sequelizeHooks()
        console.log('The database connection was successfully established')
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
    DatabaseOrder.getOrders()
        .then(orders => {
            console.log('-->  DatabaseOrder.getOrders')
            io.emit('WEB:UPDATE:ORDERS', orders)
        })
    socket.on('WEB:UPDATE:ORDERS', async () => {
        DatabaseOrder.getOrders()
            .then(orders => {
                console.log('--> WEB:UPDATE:ORDERS')
                io.emit('WEB:UPDATE:ORDERS', orders)
            })
    })
    DATABASE_ACTIONS(socket)
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



