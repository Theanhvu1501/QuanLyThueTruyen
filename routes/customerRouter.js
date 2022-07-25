const router = require('express').Router()
const customerCtrl = require('../controllers/customerCtrl')
const auth = require('../middleware/auth')


router.route('/customers')
    .get(auth,customerCtrl.getCustomers)
    .post(auth, customerCtrl.createCustomer)


router.route('/customer/:id')
    .delete( auth,customerCtrl.deleteCustomer)
    .put(auth, customerCtrl.updateCustomer)


module.exports = router