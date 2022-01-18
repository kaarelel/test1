const router= require("express").Router();
const imagesController= require("../controllers/images");

router.get("/:filename", imagesController.getMemeImage)

module.exports= router