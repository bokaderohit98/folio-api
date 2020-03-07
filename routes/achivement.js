const router = require("express").Router();
const controller = require("../controllers/achivement");
const middlewares = require("../middlewares");

/**
 * Route to add new achivement
 */
router.post("/", middlewares.auth, controller.addAchivement);

/**
 * Route to edit achivement
 */
router.put("/:id", middlewares.auth, controller.editAchivement);

/**
 * Route to delete achivement
 */
router.delete("/:id", middlewares.auth, controller.deleteAchivement);

module.exports = router;
