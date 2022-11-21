
module.exports = io => {
  io.on("connection", socket => {

    socket.on('singleAuction', async (data) => {
      socket.join(data)
      socket.emit("singleAuction", data)
    }),

      socket.on("leave", (id) => {
        socket.leave(id)
      }),

      socket.on('bid', (id) => {
        // console.log(id)
        io.in(id).emit("bid", id)
        io.emit('updateList', 'please')
      }),

      socket.on('tick', () => { io.emit('tick', 'tick') }),

      socket.on('upload', () => {
        console.log('upload')
        io.emit('upload', 'upload')
      }),

      socket.on('dummy', () => {
        console.log('ping')
      })
  })
}