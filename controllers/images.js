const createError = require('http-errors');
const fs = require('fs');
const util = require('util');
const unlinkFile = util.promisify(fs.unlink);

const { uploadFile, downloadFile } = require('../s3');

const getImage = (req, res, next) => {
  const key = req.params.key;
  const readStream = downloadFile(key);

  readStream.pipe(res);
}

const getImages = (req, res, next) => {
  res.send('retrieve images');
}

const uploadImages = async (req, res, next) => {
  const files = req.files;

  if (!files.length) {
    next(createError(500));
  }
  console.log("files:", files);

  try {
    const promises = files.map(file => uploadFile(file).then(() => unlinkFile(file.path)));
    const response = await Promise.all(promises);
    res.send('images uploaded');
  } catch (error) {
    next(error); 
  }
}

module.exports = {
  getImage,
  getImages,
  uploadImages
}