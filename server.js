const express = require("express");
const cors = require("cors");
const multer = require("multer");
const se = require("./StorageEngine");

var storage = se({
  destination: function (req, file, cb) {
    //FILE NAME CAN BE SENT FROM CLIENT
    cb(null, "./media/file.mp4");
  },
});

const upload = multer({
  storage,
}).single("media");

const app = express();

app.use(cors());
app.get("/", (req, res) => {
  res.send("Uploading test");
});

app.post("/media", upload, function (req, res, next) {
  res.status(200).json({ result: "File was uploaded successfully" });
});

const port = 3000;

app.listen(port, () => {
  console.log(`Uploading test app listening on port ${port}`);
});
