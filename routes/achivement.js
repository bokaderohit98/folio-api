const router = require("express").Router();
const controller = require("../controllers/achivement");

/**
 * Route to add new achivement
 */
router.post("/", controller.addAchivement);

/**
 * Route to edit achivement
 */
router.put("/:id", controller.editAchivement);

/**
 * Route to delete achivement
 */
router.delete("/:id", controller.deleteAchivement);

module.exports = router;
