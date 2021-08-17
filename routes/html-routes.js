const router = require("express").Router();
const path = require("path");

// front-end routes
router.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"))
});

router.get("/exercise", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/exercise.html"))
});

module.exports = router;