const { rentService } = require("../models/rentModel");

const rentCtrl = {
    getRents: async(req, res) =>{
        try {
            const rents = await rentService.getAll();
            res.json(rents)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    createRent: async (req, res) =>{
        try {
            const rent = await rentService.create(req.body)
            res.json(rent)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    deleteRent: async(req, res) =>{
        try {
            await rentService.delete(req.params.id)
            res.json({msg: "Deleted a rent"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updateRent: async(req, res) =>{
        try {
            await rentService.update(req.body)
            res.json({msg: "Updated a rent"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}


module.exports = rentCtrl