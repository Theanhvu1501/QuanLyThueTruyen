const router = require("express").Router();
const storeCtrl = require("../controllers/storeCtrl");
const auth = require("../middleware/auth");

router.route("/stores").get(storeCtrl.getStores).post(storeCtrl.createStore);

router
  .route("/store/:id")
  .delete(storeCtrl.deleteStore)
  .put(storeCtrl.updateStore);

module.exports = router;
