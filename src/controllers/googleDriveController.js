require("dotenv").config();

const { google } = require("googleapis");
const fs = require("fs");
const path = require("path");

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
);
oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const drive = google.drive({ version: "v3", auth: oauth2Client });

var folderId = "1adsU-Oc80k7z1eRnYoN9GE4I0rJYYehv";

var that = (module.exports = {
    setFilePublic: async (fileId) => {
        try {
            await drive.permissions.create({
                fileId,
                requestBody: {
                    role: "reader",
                    type: "anyone",
                },
            });

            const getUrl = await drive.files.get({
                fileId,
                fields: "webViewLink, webContentLink",
            });

            return getUrl;
        } catch (error) {
            console.log(error);
        }
    },
    uploadFile: async function (req, res, shared) {
        try {
            const createFile = await drive.files.create({
                requestBody: {
                    name: `${req.file.filename}`,
                    mimeType: "image/jpeg",
                    parents: [folderId],
                },
                media: {
                    mimeType: "image/jpeg",
                    body: fs.createReadStream(req.file.path),
                },
            });
            const fileId = createFile.data.id;
            const getUrl = await that.setFilePublic(fileId);
            shared = true;

            console.log(getUrl.data);
        } catch (error) {
            console.log(error);
        }
    },
    deleteFile: async function (fileId) {
        try {
            console.log(fileId);
            const deleteFile = await drive.files.delete({
                fileId: fileId,
            });
            console.log(deleteFile);
        } catch (error) {
            console.log(error);
        }
    },
});
