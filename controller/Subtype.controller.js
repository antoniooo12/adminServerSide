const {Subcategory} = require("../db/model/models");
const pool = require("../db/db");

class SubtypeController {

    async bulkCreate(req, res) {
        const {oldItemsToDel, newItems, oldItemsToUpdate} = req.body
        console.log(newItems)
        const dbRes = await Subcategory.bulkCreate(newItems, {
            fields: ['subcategory', 'categoryId']
        })
        console.log(oldItemsToUpdate)
        const resUpdate = await Subcategory.bulkCreate(oldItemsToUpdate, {
            updateOnDuplicate: ['subcategory','categoryId', 'id']
        })
        const dbResDestroy = await Subcategory.destroy({where: {id: oldItemsToDel}})

        return res.json(dbRes)
    }


    async getAll(req, res) {
        const dbRes = await pool.execute(`select *, (select category from categories where id = categoryId) as category
                                          from subcategories`)
        return res.json(dbRes)
    }
}

module.exports = new SubtypeController()