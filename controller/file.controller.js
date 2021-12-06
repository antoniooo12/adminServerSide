const xlsx = require('xlsx')
const config = require('config')
const ExelService = require('../services/exelService')
const csvtojsonV1 = require("csvtojson");
// Node packages for file system
const fs = require('fs');
const path = require('path');

class FileController {
    async uploadFile(req, res) {
        try {
            console.log(req.files)
            const file = req.files.file
            const type = file.name.split('.').pop()

            if (type !== 'txt') {
                return res.status(403).json({message: "файл не формату xlsx"})
            }
            let pathFile = path.resolve(__dirname, '..', 'files', file.name)

            await file.mv(pathFile)

            return res.json({message: 'успішно '})
        } catch (e) {

        }

    }
}

module.exports = new FileController()