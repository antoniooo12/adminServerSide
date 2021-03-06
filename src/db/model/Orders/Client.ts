import {DataTypes, ModelDefined} from "sequelize";
import {db} from "../../dbSequelize";
import {ClientAttributes, ClientCreationAttributes} from "../../../types/database/models/Orders/ClientType";

export const Client: ModelDefined<ClientAttributes, ClientCreationAttributes> = db.define(
    'Client',
    {
        id: {type: DataTypes.INTEGER, primaryKey: true, unique: true, autoIncrement: true},
        name: {type: DataTypes.STRING},
        surname: {type: DataTypes.STRING},
        address: {type: DataTypes.STRING},
        comments: {type: DataTypes.TEXT},
        number: {type: DataTypes.INTEGER, unique: true},
    }, {
        tableName: 'Client',
    })
