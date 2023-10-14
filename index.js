const express = require("express");
const axios = require("axios");
const app = express();
const cheerio = require("cheerio");
const port = 5000;
const url = " https://en.wikipedia.org/wiki/U.S._state ";
let states = [];

const fetchData = async () => {
  try {
    let res = await axios.get(url);
    let $ = await cheerio.load(res.data);
    $("#mw-content-text > div.mw-parser-output > div.div-col").each((i, e) => {
      states.push($(e).text().trim());
    });
    console.log($);
  } catch (e) {
    console.log(e);
  }
};
fetchData();

app.get("/states", (req, res) => {
  res.send(states);

});

app.listen(port, () => {
  console.log(`Server is running  ${port}`);
});
