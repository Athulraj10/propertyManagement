const router = require("express").Router();
const { adminTokenAuth } = require("../../middlewares/admin");

const { login, logout } = require("../../controllers/admin/authController");
const {
  addProperty,
  getProperty,
  deleteProperty,
  editProperty,
  deletePropertyLead,
} = require("../../controllers/admin/propertiesManagement");
const {
  addLead,
  getLead,
  deleteLead,
  editLead,
} = require("../../controllers/admin/LeadsManagement");

// LOGIN LOGOUT
router.post("/login", login);
router.post("/logout", adminTokenAuth, logout);
//HANDLE PROPERTY MANAGEMENT
router.post("/add-property", adminTokenAuth, addProperty);
router.post("/get-property", adminTokenAuth, getProperty);
router.delete("/delete-property/:propertyId", adminTokenAuth, deleteProperty);
router.delete("/delete-property-lead", adminTokenAuth, deletePropertyLead);
router.post("/edit-property", adminTokenAuth, editProperty);

//HANDLE LEAD MANAGEMENT
router.post("/add-lead", adminTokenAuth, addLead);
router.post("/get-lead", adminTokenAuth, getLead);
router.delete("/delete-lead/:leadId", adminTokenAuth, deleteLead);
router.post("/edit-lead", adminTokenAuth, editLead);

module.exports = router;
