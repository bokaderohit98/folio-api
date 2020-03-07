const router = require("express").Router();
const controller = require("../controllers/education");
const middlewares = require("../middlewares");

/**
 * Route to add new education
 */
router.post("/", middlewares.auth, controller.addEducation);

/**
 * Route to edit education
 */
router.put("/:id", middlewares.auth, controller.editEducation);

/**
 * Route to delete education
 */
router.delete("/:id", middlewares.auth, controller.deleteEducation);

module.exports = router;
