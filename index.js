const express = require("express");
const server = express();
const request = require("request-promise");
const cheerio = require("cheerio");
const fs = require("fs");
const dotenv = require("dotenv").config();
server.use(express.json())

const connection = require("./db");
const productRouter = require("./routes/product")
server.use("/api/product", productRouter)
const url = process.env.URL;
const PORT = process.env.PORT || 5500;

server.post("/get-data", async (req, res) => {
  try {
    const response = await request({
      uri: url,
      headers: {
        accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
        "accept-encoding": "gzip, deflate, br, zstd",
        "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
      },
      gzip: true,
    });

    const $ = cheerio.load(response);

    let results = [];

    $(".s-main-slot .s-result-item").each((index, element) => {
      const title = $(element).find("h2 span").text().trim();
      const price = $(element).find("span.a-price-whole").first().text().trim();
      const rating = $(element).find("span.a-icon-alt").text().split(" ")[0]; // Extracts only the number
      const discount = $(element).find("span.a-text-price").text().trim(); // Strikethrough price
      const image = $(element).find("img.s-image").attr("src");

      if (title) {
        results.push({ title, price, rating, discount, image });
      }
    });

    // Save response for debugging
    fs.writeFileSync("./data.html", response, "utf-8");

    res.status(200).send({ data: results });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

server.post("/add", async (req, res) => {
  try {
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

server.listen(PORT, async () => {
  try {
    await connection;
    console.log(`Server is running on PORT: ${PORT} and DB has connected`);
  } catch (error) {
    console.log(error.message);
  }
});
