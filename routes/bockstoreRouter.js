const router = require("express").Router();
const bookstoreCtrl = require("../controllers/bookstoreCtrl");
const auth = require("../middleware/auth");

router
  .route("/bookstores")
  .get(bookstoreCtrl.getBookStores)
  .post(bookstoreCtrl.createBookStore);

router
  .route("/bookstore/:id")
  .delete(bookstoreCtrl.deleteBookStore)
  .put(bookstoreCtrl.updateBookStore);

module.exports = router;
