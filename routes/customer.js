const router = require("express").Router();

//Requiring middleware auth.
const customerController = require("../controllers/customer");

router.post("/registerCustomer", customerController.register);
router.post("/signInCustomer", customerController.signIn);
router.get("/getProfileCustomer/:id", customerController.getProfile);
router.patch("/updateProfileCustomer", customerController.updateProfile);

module.exports = router;
