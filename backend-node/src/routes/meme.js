const router= require("express").Router();
const memeController= require("../controllers/meme");
const upload= require("../middleware/upload");

router.get("/", memeController.getMemes)
router.post("/create", upload.single("image"), memeController.createMeme)
router.put("/like", memeController.likeMeme)
router.put("/unlike", memeController.unLikeMeme)
router.get("/followed/:username", memeController.getFollowedMemes)
router.get("/like/:username", memeController.getLikedMemes)
router.get("/:memeID", memeController.getMeme)

module.exports= router;