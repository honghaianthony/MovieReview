const express = require("express");
const router = express.Router();
const uploadIndex = require("../../index");

const googleDriveController = require("../controllers/googleDriveController");

router.post(
    "/upload-file",
    uploadIndex.upload.single("file"),
    googleDriveController.uploadFile
);

router.get("/delete-file", googleDriveController.deleteFile);

module.exports = router;
