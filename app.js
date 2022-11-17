const express = require("express")
const cors = require("cors")
const app = express()
const http = require("http").createServer(app)
const socketIo = require("socket.io")
const socketRouter = require('./modules/socketRouter')

const io = socketIo(http, {
    cors: {
        origin: "http://localhost:3000"
    }
})

require("dotenv").config()

http.listen(4001)

app.set('socketio', io);
socketRouter(io)






    // // SEND MESSAGE TO OWN SOCKET
    // // socket.emit("message", "hello, how are you ")

    // // RECEIVE EVENT FROM FRONT END
    // // socket.on("something", data => {
    // //     console.log(data)

    //     // SEND MESSAGE TO ALL SOCKETS IN APP
    //     // io.emit("message", data)

    //     // SEND MESSAGE TO ALL SOCKETS EXCEPT ME (SENDER)
    //     socket.broadcast.emit("message", data)
    // })


    // socket.on('color', data => {
    //     // console.log(data)
    //     socket.broadcast.emit("color", data)
    // })

    // socket.on('countOthers', data => {
    //     // console.log(data)
    //     socket.broadcast.emit("countOthers", data)
    // })
    // socket.on('countMe', data => {
    //     // console.log(data)
    //     socket.emit("countMe", data)
    // })
    // socket.on('countAll', data => {
    //     // console.log(data)
    //     io.emit("countAll", data)
    // })







// app.listen(4001)

// app.use(cors({
//     origin: "http://localhost:3001",
//     credentials: true,
//     methods: "GET,HEAD,PUT,PATCH,POST,DELETE"
// }))
//
// app.use(express.json())

