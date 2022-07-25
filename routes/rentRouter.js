const router = require('express').Router()
const rentCtrl = require('../controllers/rentCtrl')
const auth = require('../middleware/auth')


router.route('/rents')
    .get(auth,rentCtrl.getRents)
    .post(auth, rentCtrl.createRent)


router.route('/rent/:id')
    .delete( auth,rentCtrl.deleteRent)
    .put(auth, rentCtrl.updateRent)


module.exports = router