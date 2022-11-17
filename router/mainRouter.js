const express = require("express")
const router = express.Router()

const {
    register,
    login,
    authSession,
    createPost,
    getPosts,
    getPost,
    comment
} = require("../controllers/mainController")


router.post('/register', register)
router.post('/login', login)
router.get('/auth', authSession)
router.post('/create', createPost)
router.get('/posts', getPosts)
router.get('/post/:id', getPost)
router.post("/comment", comment)









module.exports = router
