import express from 'express'
import dotenv from 'dotenv'

import { connectMongo } from 'config'

const server = express()
dotenv.config()
connectMongo()

server.use((_req, res) => {
  res.status(200).json('Success')
})

server.listen(process.env.SERVER_PORT || 3000)
