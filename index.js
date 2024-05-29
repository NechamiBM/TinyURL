import express from 'express'  
import cors from "cors"
import bodyParser from "body-parser"

import connectDB from './dataBase.js'
import UsersRouter from "./Routers/UsersRouter.js"
import LinksRouter from "./Routers/LinksRouter.js"

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use('/users', UsersRouter)
app.use('/links', LinksRouter)

connectDB()

const port = 5000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`)
})
