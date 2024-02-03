const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cookieParser = require('cookie-parser')
const port = 4000;
const app = express();
const { connectToMongoDB } = require("./connection");
const { URL } = require("./model/url");
const {authenticateForUsingUrl } = require("./middleware/auth")
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())

//mongoose
connectToMongoDB("mongodb://127.0.0.1:27017/shortURL");

//routes
const UrlRouter = require("./routes/url");
const staticRoute = require("./routes/staticUrl");
const userRoute = require("./routes/user");

app.use("/url",UrlRouter);
app.use("/", staticRoute);
app.use("/user", userRoute);
app.get("/url/:id", async (req, res) => {
  const id = req.params.id;
  const filter = { shortID: id };
  const update = { $push: { visitHistory: { timestamp: Date.now() } } };
  const entry = await URL.findOneAndUpdate(filter, update, { new: true });
  res.redirect(entry.redirectUrl);
});

app.listen(port, () => {
  console.log("sever started!");
});
