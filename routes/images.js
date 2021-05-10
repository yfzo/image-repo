var express = require('express');
var router = express.Router();

const {
  getImages,
  uploadImages
} = require("../controllers/images");

/* GET images listing. */
router.get('/', getImages);

router.post('/', uploadImages);

module.exports = router;
