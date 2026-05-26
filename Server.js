const express = require("express");
const puppeteer = require("puppeteer");
const app = express();

app.get("/fetch", async (req, res) => {
  const url = req.query.url;
  if (!url) return res.status(400).send("Chybí parametr url");
  
  const browser = await puppeteer.launch({ args: ["--no-sandbox", "--disable-setuid-sandbox"] });
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "networkidle2", timeout: 30000 });
  const html = await page.content();
  await browser.close();
  res.send(html);
});

app.listen(process.env.PORT || 3000);
