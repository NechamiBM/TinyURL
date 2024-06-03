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

const port = process.env.PORT || 5555

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/:id', (req, res) => {
  const query = new URLSearchParams(req.query).toString()
  const redirectUrl = `/links/${req.params.id}${query ? `?${query}` : ''}`
  res.redirect(redirectUrl)
})

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`)
})
