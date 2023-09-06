const db = require('../database/connection')
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

module.exports = async (req, res) => {
    const { email, name, password } = req.body;

    if (!email || !name || !password) {
        return res.status(400).send({
            success: false,
            message: "missing info"
        })
    }

    try {
        const newusers = await db.query('SELECT * FROM users WHERE email = $1 OR name =$2', [email, name])


        if (newusers.rows.length > 0) {
            return res.status(403).send({
                success: false,
                message: "Email or username already exists",
            })
        }

        const hash = await bcrypt.hash(password, 10)

        const newuser = await db.query('INSERT INTO users (email, name, password) VALUES ($1, $2, $3) RETURNING id', [email, name, hash])

        const token = jwt.sign({ id: newuser.rows[0].id },
            process.env.JWT_SECRET)


        res.cookie('userToken', token)
        res.status(200).send({
            success: true,
            token,
        })


    } catch (error) {

        console.log(error)
        res.status(500).send({ success: false })

    }
}