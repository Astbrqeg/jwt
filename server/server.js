const express = require("express")
const cors = require("cors")
const router = require("./router")
require("dotenv").config()


const app = express()





app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}));


app.use(express.json())
app.use(router)

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => { console.log(`listening http://localhost:${PORT}`) })

