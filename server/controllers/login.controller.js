const db = require("../database/connection");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

module.exports = async (req, res) => {
    const { email, password } = req.body;

    try {
        const users = await db.query('SELECT * FROM users WHERE email = $1', [email])
        if(users.rows.length === 0){
            return res.status(403).send({
                success: false,
                message: "email dosn't exist"
            })
        }

        const user = users.rows[0]

        const compass= await bcrypt.compare(password, user.password)

        if(!compass){
            return res.status(403).send({
                success:false,
                message:"incorrent password"
            })
        }

        const token= jwt.sign({id: user.id}, process.env.JWT_SECRET)

        res.cookie('userToken', token)
        res.status(200).send({
            success:true,
            token
        })


    } catch (error) {

        console.log(error)
        res.status(500).send({ success: false })

    }
}