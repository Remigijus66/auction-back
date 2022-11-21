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
    downloadAll,
    downloadSingle,
    placeBid,
} = require("../controllers/mainController")

router.post('/register', validateRegistration, register)
router.post('/login', login)
router.post('/logout', logout)
router.post('/checksesssion', checksesssion)
router.post('/validate', validateAuction, validate)
router.post('/upload', upload)
router.post('/downloadAll', downloadAll)
router.post('/downloadSingle', downloadSingle)
router.post('/placeBid', placeBid)


module.exports = router
