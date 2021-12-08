const express = require('express')
const config = require('config')
const {Sequelize} = require('sequelize')
const PORT = config.get('serverPort') || 4200
const fileUpload = require("express-fileupload")
const xlsx = require('xlsx')
const cors = require('cors')
const path = require('path')
const sequelize = require('./db/dbSequelize')

const fileRouter = require('./routes/fileRouter.routes')
const productRouter = require('./routes/productRouter.routes')
const {Subcategory, Product} = require("./db/model/models");

const app = express()

app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3200']
}))

app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'files', 'static')))
app.use(fileUpload({}))

app.use(express.static(__dirname))
app.use(express.static(path.resolve(__dirname, 'build')))

app.use('/api/files', fileRouter)
app.use('/api/product', productRouter)


const start = async () => {
    try {
        await sequelize.authenticate()
        ///todo sync force
        await sequelize.sync()
        console.log('Соединение с БД было успешно установлено')
        app.listen(PORT, () =>
            console.log(`server run on ${PORT}  `)
        )
    } catch (e) {
        console.log(e)
        console.log('Невозможно выполнить подключение к БД: ', e)
    }
}
start()
