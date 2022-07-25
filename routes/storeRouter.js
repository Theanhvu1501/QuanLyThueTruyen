const router = require('express').Router()
const storeCtrl = require('../controllers/storeCtrl')
const auth = require('../middleware/auth')


router.route('/stores')
    .get(auth,storeCtrl.getStores)
    .post(auth, storeCtrl.createStore)


router.route('/store/:id')
    .delete( auth,storeCtrl.deleteStore)
    .put(auth, storeCtrl.updateStore)


module.exports = router