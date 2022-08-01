const router = require("express").Router();
const bookCtrl = require("../controllers/bookCtrl");
const auth = require("../middleware/auth");

router.route("/books").get(bookCtrl.getBooks).post(bookCtrl.createBook);

router.route("/book/:id").delete(bookCtrl.deleteBook).put(bookCtrl.updateBook);

module.exports = router;
