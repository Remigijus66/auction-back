const mongoose = require("mongoose")
const Schema = mongoose.Schema

const auctionUserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  pass: {
    type: String,
    required: true
  },

})

module.exports = mongoose.model("auctionUserSchema", auctionUserSchema)