// const chatLogPirmas = []
// const chatLogAntras = []
// const chatLogTrecias = []

const auctionSchema = require("../schemas/auctionSchema")


module.exports = io => {
  io.on("connection", socket => {

    socket.on('singleAuction', async (data) => {
      // const name = req.session.name
      const name = 'ok'
      if (name) {
        socket.join(data)
        const singleAuction = await auctionSchema.findOne({ _id: data })
        socket.emit("singleAuction", singleAuction)
      } else {
        const singleAuction = {}
        socket.emit("singleAuction", singleAuction)
      }

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
        io.in(id).emit("bid", singleAuction)
        io.emit('updateList', auctions)
      }),

      socket.on('tick', (data) => { io.emit('tick', 'tick') })

    // socket.on('joinRoom', (data) => {
    //   console.log(data)
    //   socket.join(data.roomName)
    //   const msg = `${data.user} has joined the room ${new Date}`
    //   socket.to(data.roomName).emit("newUser", msg);
    // })

    // socket.on('leaveTheRoom', (data) => {
    //   console.log(data)
    //   socket.leave(data.roomName)
    //   const msg = `${data.user} has farted and left the room. Bastard`
    //   socket.to(data.roomName).emit("newUser", msg);
    // })



    // socket.on('chatMessage', data => {
    //   // console.log(data)
    //   const messageData = {
    //     name: data.name, message: data.message, time: data.time
    //   }
    //   // console.log(messageData)
    //   if (data.roomName === "pirmas") {
    //     chatLogPirmas.push(messageData)
    //     // console.log(chatLog)
    //     io.in(data.roomName).emit("newchatmsg", chatLogPirmas)
    //   }
    //   if (data.roomName === "antras") {
    //     chatLogAntras.push(messageData)
    //     // console.log(chatLog)
    //     io.in(data.roomName).emit("newchatmsg", chatLogAntras)
    //   }
    //   if (data.roomName === "trecias") {
    //     chatLogTrecias.push(messageData)
    //     // console.log(chatLog)
    //     io.in(data.roomName).emit("newchatmsg", chatLogTrecias)
    //   }
    // })

  })
}