import {Sequelize} from "sequelize";
import model from "./model/Category";
import {createNamespace} from "cls-hooked";

const config = require('config')

export const namespace = createNamespace('ns')
Sequelize.useCLS(namespace)

const dbParams = config.get('db')

export const db = new Sequelize(dbParams.database,
    dbParams.user, dbParams.password, {
        port: dbParams.port,
        host: dbParams.host,
        dialect: dbParams.type,
        timezone: '+00:00',
        define: {
            timestamps: false
        }
    })

export function openConnection() {
    return db.authenticate();
}

