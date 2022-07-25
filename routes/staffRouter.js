const router = require('express').Router()
const staffCtrl = require('../controllers/staffCtrl')
const auth = require('../middleware/auth')


router.route('/staffs')
    .get(auth,staffCtrl.getStaffs)
    .post(auth, staffCtrl.createStaff)


router.route('/staff/:id')
    .delete( auth,staffCtrl.deleteStaff)
    .put(auth, staffCtrl.updateStaff)


module.exports = router