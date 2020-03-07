const router = require("express").Router();
const controller = require("../controllers/user");

/**
 * Get Basic details of user
 */
router.get("/:id", controller.getBasicDetails);

/**
 * Get all details for portfolio
 */
router.get("/:id/all", controller.getAllDetails);

/**
 * Create new user
 */
router.post("/", controller.createNewUser);

/**
 * Update Basic details
 */
router.put("/", controller.updateBasicDetails);

module.exports = router;
