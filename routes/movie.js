const router = require("express").Router();

//Requiring middleware auth.
const movieController = require("../controllers/movie");

router.post("/enterMovie", movieController.enterMovie);
router.post("/updateMovie", movieController.updateMovie);
router.get("/getMovie/:id", movieController.getMovie);
router.patch("/deleteMovie", movieController.deleteMovie);

router.post("/addReview", movieController.addReview);
router.post("/updateReview", movieController.updateReview);
router.get("/getReview/:id", movieController.getReview);
router.patch("/deleteReview", movieController.deleteReview);

module.exports = router;
