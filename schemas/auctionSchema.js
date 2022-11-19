const mongoose = require("mongoose")
const Schema = mongoose.Schema

const auctionSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },

  startPrice: {
    type: Number,
    required: true
  },
  bids: {
    type: Array,
    required: false
  },

  // closingPrice: {
  //   type: Number,
  //   required: false
  // },
  // winner: {
  //   type: String,
  //   required: false
  // }

})

module.exports = mongoose.model("auctionSchema", auctionSchema)