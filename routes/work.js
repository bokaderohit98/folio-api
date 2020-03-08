const router = require("express").Router();
const controller = require("../controllers/work");
const middlewares = require("../middlewares");

/**
 * Route to add new work
 */
router.post("/", middlewares.auth, middlewares.verified, controller.addWork);

/**
 * Route to edit work
 */
router.put("/:id", middlewares.auth, middlewares.verified, controller.editWork);

/**
 * Route to delete work
 */
router.delete(
  "/:id",
  middlewares.auth,
  middlewares.verified,
  controller.deleteWork
);

module.exports = router;
