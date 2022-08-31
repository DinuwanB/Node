const express = require("express");
const multer = require("multer");
const excelToJson = require("convert-excel-to-json");
const fs = require("fs-extra");

const app = express();
const port = 3000;

var upload = multer({ dest: "uploads/" });

app.post("/file", upload.single("file"), (req, res) => {
  try {
    if (req.file?.filename == null || req.file?.filename == 'undefined') {
        res.status(400).json("No file")
    } else {
      var filepath = "uploads/" + req.file.filename;

      const excelData = excelToJson({
        sourceFile: filepath,
        header: {
          rows: 1,
        },
        columnToKey: {
          "*": "{{columnHeader}}",
        },
      });

      fs.remove(filepath);

      res.status(203).json(excelData);
    }
  } catch (error) {
    console.log(error)
    res.status(500).json("Something wrong");
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
