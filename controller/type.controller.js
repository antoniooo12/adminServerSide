const {Category} = require('../db/model/models')
const db = require('../db/db')

class TypeController {
    ///gently
    async create(req, res) {
        const {title} = req.body
        console.log(title)
        const type = await Category.create({title})
        return res.json(type)
    }

    async bulkCreate(req, res) {
        const {oldCategoriesToDel, newCategories} = req.body
        const resDelete = Category.destroy({where: {id: oldCategoriesToDel}})
        const typesResponse = await Category.bulkCreate(newCategories, {
            fields: ['category']
        })
        return res.json(typesResponse)
    }

    ///gently
    async create(typeName) {
        const type = await Category.findOrCreate({
            where: {
                title: typeName
            }
        })
        console.log('+++++++')
        console.log(type[0].dataValues.id)
        return type[0].dataValues.id
    }

    async getAll(req, res) {
        const types = await Category.findAll()
        return res.json(types)
    }
}

module.exports = new TypeController()