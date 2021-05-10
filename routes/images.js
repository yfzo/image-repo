const express = require('express');
const router = express.Router();
const multer = require('multer');

const upload = multer({ dest: 'uploads/' });

const {
  getImage,
  getImages,
  uploadImages,
} = require("../controllers/images");

router.get('/:key', getImage);

router.get('/', getImages);

router.post('/', upload.array("images", 50), uploadImages);

module.exports = router;
