const router = require("express").Router();
const staffCtrl = require("../controllers/staffCtrl");
const auth = require("../middleware/auth");

router.route("/staffs").get(staffCtrl.getStaffs).post(staffCtrl.createStaff);

router
  .route("/staff/:id")
  .delete(staffCtrl.deleteStaff)
  .put(staffCtrl.updateStaff);

module.exports = router;
