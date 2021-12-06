const {Subcategory} = require("../db/model/models");

class SubtypeController {

    async bulkCreate(req, res) {
        const {oldSubcategoriesToDel, newSubcategories} = req.body
        const dbRes = await Subcategory.bulkCreate(Subcategory, {
            fields: ['title']
        })
        return res.json(dbRes)
    }


    async getAll(req, res) {
        const dbRes = await Subcategory.findAll()
        return res.json(dbRes)
    }
}

module.exports = new SubtypeController()