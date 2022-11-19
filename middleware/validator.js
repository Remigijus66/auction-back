module.exports = {
    validateRegistration: (req, res, next) => {
        const { name, passOne, passTwo } = req.body

        if (name.trim().length < 1) return res.send({ error: true, message: "Name is required", data: 'badName' })
        if (passOne !== passTwo) return res.send({ error: true, message: "Passwords do not match", data: 'badPass' })
        if (passOne.trim().length < 1) return res.send({ error: true, message: "Password is required", data: 'badPass' })

        next()
    },
    validateAuction: (req, res, next) => {
        const { image, title, time, price } = req.body
        if (image.trim().length < 1 || title.trim().length < 1 || time === '' || Date.parse(time) <= Date.parse(new Date) || price <= 0)
            return res.send({ error: true, message: "Incorrect auction details", data: null })
        next()
    }
}