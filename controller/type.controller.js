// const {Category} = require('../db/model/models')
const pool = require("../db/db");


class TypeController {
    ///gently
    async create(req, res) {
        const {title} = req.body
        console.log(title)
        const type = await Category.create({title})
        return res.json(type)
    }

    async bulkCreate(req, res) {
        console.log(req.body)
        // const {oldCategoriesToDel, newCategories, oldItemsToUpdate} = req.body
        // const typesResponse = await Category.bulkCreate(newCategories, {
        //     fields: ['category']
        // })
        // console.log(newCategories)
        // const resUpdate = await Category.bulkCreate(oldItemsToUpdate, {
        //     updateOnDuplicate: ['category', 'id']
        // })
        // if(oldCategoriesToDel.length>0){
        //     const resDelete = Category.destroy({where: {id: oldCategoriesToDel}})
        // }
        // console.log(typesResponse)
        return res.json('str')
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
        const types = await pool.execute(`select id, category
                                          from categories`)
        console.log(types)
        return res.json(types)
    }
}

module.exports = new TypeController()