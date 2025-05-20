const express = require('express')
const app = express()
const port = 4001
const dbConnect = require("./config/dbConnect")
const authRouter = require("./routes/authorRoute")
const genreRouter = require("./routes/genreRoute")
const publisherRouter = require("./routes/publisherRoute")
const bookRouter = require("./routes/bookRoute")
const userRouter = require("./routes/userRoute")

const bodyParser = require('body-parser')


const knex = require('knex') ({
    client: 'mysql2',
    connection: dbConnect.database,
    // debug:true
})

app.locals.knex = knex

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})
app.use(bodyParser.json())
app.use("/api-v1/author", authRouter)
app.use("/api-v1/genre", genreRouter)
app.use("/api-v1/publisher", publisherRouter)
app.use("/api-v1/book", bookRouter)
app.use("/api-v1/user", userRouter)