


const { URL } = require("../model/url");
const nanoId = require('nano-id');

const SaveUrlAndGenerateShortUrl = async (req, res) => {
   const longUrl = req.body.url;
   const shortUrl = nanoId(8);
  const entry = await URL.create({
    shortID: shortUrl,
    redirectUrl: longUrl,
    visitHistory: [],
    createdBy : req.user._id,
  });
  console.log(entry);
  return res.status(200).render("home", { id : shortUrl })
}
const showAnalytics = async (req,res)=>{
  const shortId = req.params.shortID;
  const entry = await URL.findOne({shortID : shortId});
  const totalVisit = entry.visitHistory.length;
  const history = entry.visitHistory;
  res.status(200).json({ "total visits": totalVisit, "history" : history})
}
module.exports = {
  SaveUrlAndGenerateShortUrl,
  showAnalytics
};
