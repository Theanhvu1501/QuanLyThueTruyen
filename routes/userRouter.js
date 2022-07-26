const router = require("express").Router();
const adminCtrl = require("../controllers/adminCtrl");
const auth = require("../middleware/auth");

router.post("/register", adminCtrl.register);

router.post("/login", adminCtrl.login);

router.get("/logout", adminCtrl.logout);

router.get("/refresh_token", adminCtrl.refreshToken);

router.get("/infor", auth);

router.patch("/addcart", auth);

router.get("/history", auth);

module.exports = router;
