const router = require("express").Router();

const {
  login,
  logout,
  register,
} = require("../../controllers/app/authController");
const { getProperty } = require("../../controllers/admin/propertiesManagement");


router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/get-property", getProperty);





module.exports = router;
