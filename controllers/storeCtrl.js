const { storeService } = require("../models/storeModel");

const storeCtrl = {
    getStores: async(req, res) =>{
        try {
            const stores = await storeService.getAll();
            res.json(stores)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    createStore: async (req, res) =>{
        try {
            const store = await storeService.create(req.body)
            res.json(store)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    deleteStore: async(req, res) =>{
        try {
            await storeService.delete(req.params.id)
            res.json({msg: "Deleted a store"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updateStore: async(req, res) =>{
        try {
            await storeService.update(req.body)
            res.json({msg: "Updated a store"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}


module.exports = storeCtrl