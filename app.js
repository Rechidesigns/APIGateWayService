const express = require("express")
const morgan = require("morgan")
const createError = require("http-errors")
require("dotenv").config()

const app = express()

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})
