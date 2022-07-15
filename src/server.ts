import express from 'express'
import dotenv from 'dotenv'

const server = express()
dotenv.config()

server.use((_req, res) => {
  res.status(200).json('Success')
})

server.listen(process.env.SERVER_PORT || 3000)
