import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.redirect("/gallery/1");
});

app.get("/gallery/:page", (req, res) => {
  const page = parseInt(req.params.page);
  const imagesPerPage = 10;

  const imagesFolder = path.join(__dirname, "public/images");

  fs.readdir(imagesFolder, (err, files) => {
    if (err) {
      return res.send("Error reading images folder");
    }

    const totalImages = files.length;
    const totalPages = Math.ceil(totalImages / imagesPerPage);

    const startIndex = (page - 1) * imagesPerPage;
    const endIndex = startIndex + imagesPerPage;

    const paginatedImages = files
      .slice(startIndex, endIndex)
      .map(file => `/images/${file}`);

    res.render("gallery", {
      images: paginatedImages,
      currentPage: page,
      totalPages
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});