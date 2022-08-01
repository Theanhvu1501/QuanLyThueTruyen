const router = require("express").Router();
const rentCtrl = require("../controllers/rentCtrl");
const auth = require("../middleware/auth");

router.route("/rents").get(rentCtrl.getRents).post(rentCtrl.createRent);

router.route("/rent/:id").delete(rentCtrl.deleteRent).put(rentCtrl.updateRent);

module.exports = router;
