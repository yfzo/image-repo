const getImages = (req, res, next) => {
  res.send('retrieve images');
}

const uploadImages = async (req, res, next) => {
  res.send('images uploaded');
}

module.exports = {
  getImages,
  uploadImages
}