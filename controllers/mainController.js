const {uid} = require("uid")

const users = []
const posts = []
const comments = []

module.exports = {

    register: (req, res) => {
        const {email, passOne} = req.body

        const sameUser = users.find(x => x.email === email)
        if(sameUser) return res.send({error: true})

        users.push({
            email: email,
            password: passOne
        })

        console.log(req.body)

        res.send({error: false})
    },
    login: (req, res) => {
        const {email, password} = req.body

        const user = users.find(x => x.email === email && x.password === password)

        if(user) {
            req.session.user = user.email
            return res.send({error: false})
        }

        res.send({error: true})
    },
    authSession: (req, res) => {
        const {user} = req.session
        console.log(user)
        res.send({error: !(!!user) })
    },

    createPost: (req, res) => {
        const {url} = req.body
        const {user} = req.session

        if(user) {
            posts.push({
                image: url,
                id: uid(),
                user
            })

            return res.send({error: false})
        }

        res.send({error: true})
    },
    getPosts: (req, res) => {
        res.send({error: false, posts})
    },
    getPost: (req, res) => {
        const {id} = req.params

        const {user} = req.session

        const post = posts.find(x => x.id === id)

        const myComments = comments.filter(x => x.id === id)

        res.send({error: false, post, loggedIn: !!user, comments: myComments})
    },
    comment: (req, res) => {
        const {comment, postId} = req.body

        const {user} = req.session

        if(user) {
            const com = {
                comment,
                user,
                id: postId,
                time: Date.now()
            }

            comments.push(com)

            const allPostComments = comments.filter(x => x.id === postId)
            return res.send({error: false, comments: allPostComments})
        }

        res.send({error: true})
    }

}
