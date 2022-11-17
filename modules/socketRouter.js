const chatLogPirmas = []
const chatLogAntras = []
const chatLogTrecias = []


module.exports = io => {
  io.on("connection", socket => {

    socket.on('joinRoom', (data) => {
      console.log(data)
      socket.join(data.roomName)
      const msg = `${data.user} has joined the room ${new Date}`
      socket.to(data.roomName).emit("newUser", msg);
    })

    socket.on('leaveTheRoom', (data) => {
      console.log(data)
      socket.leave(data.roomName)
      const msg = `${data.user} has farted and left the room. Bastard`
      socket.to(data.roomName).emit("newUser", msg);
    })



    socket.on('chatMessage', data => {
      // console.log(data)
      const messageData = {
        name: data.name, message: data.message, time: data.time
      }
      // console.log(messageData)
      if (data.roomName === "pirmas") {
        chatLogPirmas.push(messageData)
        // console.log(chatLog)
        io.in(data.roomName).emit("newchatmsg", chatLogPirmas)
      }
      if (data.roomName === "antras") {
        chatLogAntras.push(messageData)
        // console.log(chatLog)
        io.in(data.roomName).emit("newchatmsg", chatLogAntras)
      }
      if (data.roomName === "trecias") {
        chatLogTrecias.push(messageData)
        // console.log(chatLog)
        io.in(data.roomName).emit("newchatmsg", chatLogTrecias)
      }
    })

  })
}