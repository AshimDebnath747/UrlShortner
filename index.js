const express = require("express");
const mongoose = require("mongoose");
const port = 4000;
const UrlRouter = require("./routes/url");
const app = express();
const { connectToMongoDB } = require("./connection");
const { URL } = require("./model/url");
//middleware
app.use(express.json());
//mongoose
connectToMongoDB("mongodb://127.0.0.1:27017/shortURL");

app.use("/url", UrlRouter);
app.get("/:id", async (req, res) => {
  const id = req.params.id;
  const filter = { shortID: id };
  const update = { $push: { visitHistory: { timestamp: Date.now(), }, } ,};
  const entry = await URL.findOneAndUpdate(filter, update);
  res.redirect(entry.redirectUrl);
});

app.listen(port, () => {
  console.log("sever started!");
});
