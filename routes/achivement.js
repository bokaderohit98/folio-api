const router = require("express").Router();
const controller = require("../controllers/achivement");
const middlewares = require("../middlewares");

/**
 * Route to add new achivement
 */
router.post(
  "/",
  middlewares.auth,
  middlewares.verified,
  controller.addAchivement
);

/**
 * Route to edit achivement
 */
router.put(
  "/:id",
  middlewares.auth,
  middlewares.verified,
  controller.editAchivement
);

/**
 * Route to delete achivement
 */
router.delete(
  "/:id",
  middlewares.auth,
  middlewares.verified,
  controller.deleteAchivement
);

module.exports = router;
