const express = require("express");
const ytdl = require("ytdl-core");

const app = express();

app.get("/download", async (req, res) => {
  const v_id = req.query.url.split("v=")[1];
  const info = await ytdl.getInfo(req.query.url);

  let data = {
    url: "https://www.youtube.com/embed/" + v_id,
    info: info.formats.sort((a, b) => {
      return a.mimeType < b.mimeType;
    }),
  };

  return res.send(data);
});

app.get("/data", async (req, res) => {
  var url = req.query.url;

  res.header("content-Disposition", 'attachment; filename="video.mp4');

  ytdl(url, { format: "mp4" }).pipe(res);
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
