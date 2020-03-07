const router = require("express").Router();
const controller = require("../controllers/work");
const middlewares = require("../middlewares");

/**
 * Route to add new work
 */
router.post("/", middlewares.auth, controller.addWork);

/**
 * Route to edit work
 */
router.put("/:id", middlewares.auth, controller.editWork);

/**
 * Route to delete work
 */
router.delete("/:id", middlewares.auth, controller.deleteWork);

module.exports = router;
