const router = require("express").Router();
const controller = require("../controllers/work");

/**
 * Route to add new work
 */
router.post("/", controller.addWork);

/**
 * Route to edit work
 */
router.put("/:id", controller.editWork);

/**
 * Route to delete work
 */
router.delete("/:id", controller.deleteWork);

module.exports = router;
