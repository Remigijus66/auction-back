const express = require("express")
const router = express.Router()
const { validateRegistration, validateAuction } = require("../middleware/validator")

const {
    register,
    login,
    logout,
    checksesssion,
    validate,
    upload,
    downloadActual,
    downloadSingle,
} = require("../controllers/mainController")

router.post('/register', validateRegistration, register)
router.post('/login', login)
router.post('/logout', logout)
router.post('/checksesssion', checksesssion)
router.post('/validate', validateAuction, validate)
router.post('/upload', upload)
router.get('/downloadActual', downloadActual)
router.post('/downloadSingle', downloadSingle)
// router.get('/auth', authSession)
// router.post('/create', createPost)
// router.get('/posts', getPosts)
// router.get('/post/:id', getPost)
// router.post("/comment", comment)



module.exports = router
