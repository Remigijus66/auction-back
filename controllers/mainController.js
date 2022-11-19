const bcrypt = require("bcrypt");
const auctionSchema = require("../schemas/auctionSchema");
const auctionUserSchema = require("../schemas/auctionUserSchema")
// const { uid } = require("uid")
// const users = []
// const posts = []
// const comments = []


module.exports = {

    register: async (req, res) => {
        const { name, passOne, passTwo } = req.body
        const userExists = await auctionUserSchema.findOne({ name })
        if (userExists) return res.send({ error: true, message: "This name is allready in use", data: 'badName' })
        const hash = await bcrypt.hash(passOne, 10)
        const user = new auctionUserSchema({ name, pass: hash })
        await user.save()
        res.send({ error: false, message: null, data: name })

        // const sameUser = users.find(x => x.email === email)
        // if (sameUser) return res.send({ error: true })

        // users.push({
        //     email: email,
        //     password: passOne
        // })
        console.log('name ===', name);
        console.log('passOne ===', passOne);
        console.log('passTwo ===', passTwo);
        console.log('hash ===', hash);
        // console.log(req.body)

        // res.send({ error: false, message: 'received' })
    },


    login: async (req, res) => {
        const { name, pass } = req.body
        console.log('name ===', name);
        console.log('pass ===', pass);
        const user = await auctionUserSchema.findOne({ name })
        if (!user) return res.send({ error: true, message: "user not found", data: null })
        const correctPassword = await bcrypt.compare(pass, user.pass);
        if (!correctPassword) return res.send({ error: true, message: "incorrect password", data: null })
        console.log('correctPassword ===', correctPassword);
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
        name ? res.send({ message: 'yes you are in session', data: name }) : res.send({ message: 'you are not logged in ', data: name })

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
        const bids = [{ name: 'name', price: 10 }]
        const parsedTime = Date.parse(time)
        const auction = new auctionSchema({ name, image, title, time: parsedTime, startPrice: price, bids })
        await auction.save()
        res.send(({ error: false, message: 'Auction uploaded', data: { image, title, time, startPrice: price, bids } }))
    },
    downloadActual: async (req, res) => {
        console.log('download...')
        let filter = { time: { $gt: Date.parse(new Date) } }
        const auctions = await auctionSchema.find(filter)
        // console.log('auctions', auctions)
        res.send({ messsage: 'OK', data: auctions })
    },
    downloadSingle: async (req, res) => {
        const { id } = req.body
        const name = req.session.name
        if (!name) return res.send({ error: true, message: 'you are not logged in', data: null })
        const singleAuction = await auctionSchema.findOne({ _id: id })
        res.send({ messsage: 'OK', data: singleAuction })
    }

    // authSession: (req, res) => {
    //     const {user} = req.session
    //     console.log(user)
    //     res.send({error: !(!!user) })
    // },

    // createPost: (req, res) => {
    //     const {url} = req.body
    //     const {user} = req.session

    //     if(user) {
    //         posts.push({
    //             image: url,
    //             id: uid(),
    //             user
    //         })

    //         return res.send({error: false})
    //     }

    //     res.send({error: true})
    // },
    // getPosts: (req, res) => {
    //     res.send({error: false, posts})
    // },
    // getPost: (req, res) => {
    //     const {id} = req.params

    //     const {user} = req.session

    //     const post = posts.find(x => x.id === id)

    //     const myComments = comments.filter(x => x.id === id)

    //     res.send({error: false, post, loggedIn: !!user, comments: myComments})
    // },
    // comment: (req, res) => {
    //     const {comment, postId} = req.body

    //     const {user} = req.session

    //     if(user) {
    //         const com = {
    //             comment,
    //             user,
    //             id: postId,
    //             time: Date.now()
    //         }

    //         comments.push(com)

    //         const allPostComments = comments.filter(x => x.id === postId)
    //         return res.send({error: false, comments: allPostComments})
    //     }

    //     res.send({error: true})
    // }

}
