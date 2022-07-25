const router = require('express').Router()
const bookstoreCtrl = require('../controllers/bookstoreCtrl')
const auth = require('../middleware/auth')


router.route('/bookstores')
    .get(auth,bookstoreCtrl.getBookStores)
    .post(auth, bookstoreCtrl.createBookStore)


router.route('/bookstore/:id')
    .delete( auth,bookstoreCtrl.deleteBookStore)
    .put(auth, bookstoreCtrl.updateBookStore)


module.exports = router