const multer = require("multer");
const path = require("path");
const { GridFsStorage } = require("multer-gridfs-storage");

const storage = new GridFsStorage({
  url: "mongodb+srv://nhatdaica123:g4XUuMHww8d1fEBI@cluster0.gmx6b.mongodb.net/shopping-cart?retryWrites=true&w=majority",
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      const filename = `${file.fieldname}-${Date.now()}${path.extname(
        file.originalname
      )}`;
      const fileInfo = {
        filename,
        bucketName: "images",
      };
      resolve(fileInfo);
    });
  },
});

const mongoUpload = multer({ storage });

module.exports = mongoUpload;
