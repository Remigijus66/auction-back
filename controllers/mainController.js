const bcrypt = require("bcrypt");
const session = require("express-session");
const auctionSchema = require("../schemas/auctionSchema");
const auctionUserSchema = require("../schemas/auctionUserSchema")
// const { uid } = require("uid")
// const users = []
// const posts = []
// const comments = []


module.exports = {

    register: async (req, res) => {
        const { name, passOne } = req.body
        const userExists = await auctionUserSchema.findOne({ name })
        if (userExists) return res.send({ error: true, message: "This name is allready in use", data: 'badName' })
        const hash = await bcrypt.hash(passOne, 10)
        const user = new auctionUserSchema({ name, pass: hash })
        await user.save()
        req.session.name = name;
        res.send({ error: false, message: 'session established', data: name })
    },


    login: async (req, res) => {
        const { name, pass } = req.body
        // console.log('name ===', name);
        // console.log('pass ===', pass);
        const user = await auctionUserSchema.findOne({ name })
        if (!user) return res.send({ error: true, message: "user not found", data: null })
        const correctPassword = await bcrypt.compare(pass, user.pass);
        if (!correctPassword) return res.send({ error: true, message: "incorrect password", data: null })
        // console.log('correctPassword ===', correctPassword);
        req.session.name = name;

        console.log('session established')
        res.send({ error: false, message: 'session established', data: name })

    },
    logout: (req, res) => {
        console.log(req)
        req.session.destroy()
        console.log('session terminated')
        res.send({ message: 'session terminated' })

    },

    checksesssion: (req, res) => {
        const name = req.session.name
        console.log(name)
        name ? res.send(true) : res.send(false)

    },
    validate: (req, res) => {
        const { image, title, time, price } = req.body
        const name = req.session.name
        if (!name) return res.send({ error: true, message: 'you are not logged in', data: null })
        res.send(({ error: false, message: null, data: { image, title, time, price } }))
    },
    upload: async (req, res) => {
        const { image, title, time, price } = req.body
        const name = req.session.name
        if (!name) return res.send({ error: true, message: 'you are not logged in', data: null })
        const parsedTime = Date.parse(time)
        const auction = new auctionSchema({ name, image, title, time: parsedTime, startPrice: price, })
        await auction.save()
        res.send(({ error: false, message: 'Auction uploaded', data: { image, title, time, startPrice: price, } }))
    },
    downloadActual: async (req, res) => {
        // const name = req.session.name
        // if (!name) return res.send({ error: true, message: 'you are not logged in', data: null })
        const auctions = await auctionSchema.find()
        // console.log('auctions', auctions)
        // console.log(auctions)
        res.send({ messsage: 'OK', data: auctions })
    },
    downloadSingle: async (req, res) => {
        const { id } = req.body
        const name = req.session.name
        if (!name) return res.send({ error: true, message: 'you are not logged in', data: null })
        const singleAuction = await auctionSchema.findOne({ _id: id })
        res.send({ messsage: 'OK', data: singleAuction })
    }


}
