import {Product, TypeOfProduct} from "./db/model/models";

const express = require('express')

import config = require('config')

const PORT = config.get('serverPort') || 4200
const fileUpload = require("express-fileupload")
const cors = require('cors')
const path = require('path')
const sequelize = require('./db/dbSequelize')

import {productRouter} from './routes/productRouter.routes'

const app = express()

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



const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync({force: true})
        console.log('Соединение с БД было успешно установлено')
        app.listen(PORT, () => {

            console.log(`server run on ${PORT}  `)
        })

    } catch (e) {
        console.log(e)
        console.log('Невозможно выполнить подключение к БД: ', e)
    }
}

start()

module.exports = app



