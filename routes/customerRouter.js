const router = require("express").Router();
const customerCtrl = require("../controllers/customerCtrl");
const auth = require("../middleware/auth");

router
  .route("/customers")
  .get(customerCtrl.getCustomers)
  .post(customerCtrl.createCustomer);

router
  .route("/customer/:id")
  .delete(customerCtrl.deleteCustomer)
  .put(customerCtrl.updateCustomer);

module.exports = router;
