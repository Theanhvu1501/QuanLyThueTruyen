const { bookStoreService } = require("../models/bookStoreModel");

const bookStoreCtrl = {
    getBookStores: async(req, res) =>{
        try {
            const bookStores = await bookStoreService.getAll();
            res.json(bookStores)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    createBookStore: async (req, res) =>{
        try {
            const bookStore = await bookStoreService.create(req.body)
            res.json(bookStore)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    deleteBookStore: async(req, res) =>{
        try {
            await bookStoreService.delete(req.params.id)
            res.json({msg: "Deleted a bookStore"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updateBookStore: async(req, res) =>{
        try {
            await bookStoreService.update(req.body)
            res.json({msg: "Updated a bookStore"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}


module.exports = bookStoreCtrl