const createError = require("http-errors");
const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);

const { uploadFile, retrieveFile, retrieveFilePromise } = require("../s3");

const getImage = (req, res, next) => {
  const db = req.app.locals.db;
  const key = req.params.key;

  db.query(`SELECT permission, user_id FROM images WHERE key=$1`, [key]).then(
    async (result) => {
      const image = result.rows[0];

      if (!image) {
        next(createError(404));
      } else if (image.user_id == req.user.id || image.permission == "public") {
        const readStream = retrieveFile(key);
        
        readStream.pipe(res);
        res.send(response);
      } else {
        // user is not owner of image and image permission is private
        next(createError(403));
      }
    }
  );
};

const getImages = (req, res, next) => {
  res.send("retrieve images");
};

const uploadImages = async (req, res, next) => {
  if (!req.isAuthenticated()) {
    next(createError(401));
    return;
  }

  const files = req.files;
  const db = req.app.locals.db;

  if (!files.length) {
    next(createError(500));
  }
  console.log("files:", files);

  try {
    const promises = files.map((file) => {
      uploadFile(file)
        .then(() => unlinkFile(file.path))
        .then(() => {
          db.query(
            `INSERT INTO images(key, permission, user_id) VALUES ($1, $2, $3)`,
            [file.filename, req.body.permission, req.user.id]
          );
        });
    });

    await Promise.all(promises);

    res.send("images uploaded");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getImage,
  getImages,
  uploadImages,
};
