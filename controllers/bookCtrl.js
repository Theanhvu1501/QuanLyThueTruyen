const { bookService } = require("../models/bookModel");

const bookCtrl = {
    getBooks: async(req, res) =>{
        try {
            const books = await bookService.getAll();
            res.json(books)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    createBook: async (req, res) =>{
        try {
            const book = await bookService.create(req.body)
            res.json(book)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    deleteBook: async(req, res) =>{
        try {
            await bookService.delete(req.params.id)
            res.json({msg: "Deleted a book"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updateBook: async(req, res) =>{
        try {
            await bookService.update(req.body)
            res.json({msg: "Updated a book"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}


module.exports = bookCtrl