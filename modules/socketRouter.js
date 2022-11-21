// const chatLogPirmas = []
// const chatLogAntras = []
// const chatLogTrecias = []

const auctionSchema = require("../schemas/auctionSchema")


module.exports = io => {
  io.on("connection", socket => {

    socket.on('singleAuction', async (data) => {
      // const name = req.session.name
      // const name = 'ok'
      // if (name) {
      socket.join(data)
      // const singleAuction = await auctionSchema.findOne({ _id: data })
      socket.emit("singleAuction", data)
      // } else {
      //   const singleAuction = {}
      //   socket.emit("singleAuction", singleAuction)
      // }

    }),

      socket.on("leave", (id) => {
        socket.leave(id)
      }),

      socket.on('bid', async (id, newPrice, bidderName) => {
        const auction = await auctionSchema.findOne({ _id: id })
        if (auction.bids.length === 0 && newPrice <= auction.startPrice) return
        if (auction.bids.length > 0 && newPrice <= auction.bids[auction.bids.length - 1].price) return
        if (Date.parse(new Date) >= auction.time) return
        const bid = { name: bidderName, price: newPrice }
        await auctionSchema.findOneAndUpdate({ _id: id }, { $push: { bids: bid } })
        const singleAuction = await auctionSchema.findOne({ _id: id })
        const filter = { time: { $gt: Date.parse(new Date) } }
        const auctions = await auctionSchema.find(filter)
        io.in(id).emit("bid", id)
        io.emit('updateList', auctions)
      }),

      socket.on('tick', () => { io.emit('tick', 'tick') }),

      socket.on('upload', () => {
        console.log('upload')
        io.emit('upload', 'upload')
      })
  })
}