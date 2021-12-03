require("dotenv").config();

const multer = require("multer");

const storage = multer.diskStorage({
  // destination: "./public/upload",
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5242880 },
  dest: "public/upload/",
});

module.exports = {
  upload: upload,
};
