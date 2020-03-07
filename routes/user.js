const router = require("express").Router();
const controller = require("../controllers/user");
const middlewares = require("../middlewares");

/**
 * Get all details for portfolio
 */
router.get("/:id/all", controller.getAllDetails);

/**
 * Create new user
 */
router.post("/register", controller.createNewUser);

/**
 * Login user
 */
router.post("/login", controller.loginUser);

/**
 * Update Basic details
 */
router.put("/", middlewares.auth, controller.updateBasicDetails);

/**
 * Logout from the device
 */
router.get("/logout", middlewares.auth, controller.logoutUser);

/**
 * Logout from all devices
 */
router.get("/logoutall", middlewares.auth, controller.logoutFromAllDevices);

/**
 * Get Basic details of user
 */
router.get("/:id", controller.getBasicDetails);

module.exports = router;
