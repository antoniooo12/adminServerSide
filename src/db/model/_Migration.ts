import {DataTypes, Model} from "sequelize";
import {db} from "../dbSequelize";

class Migration extends Model {
}
const model = db.define('_migrations',{
    filename: {type: DataTypes.STRING(255), primaryKey: true},
    appliedAt: {type: DataTypes.DATE, allowNull: false}
})

export default  model;