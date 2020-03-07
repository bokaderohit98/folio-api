const router = require("express").Router();
const controller = require("../controllers/education");

/**
 * Route to add new education
 */
router.post("/", controller.addEducation);

/**
 * Route to edit education
 */
router.put("/:id", controller.editEducation);

/**
 * Route to delete education
 */
router.delete("/:id", controller.deleteEducation);

module.exports = router;
