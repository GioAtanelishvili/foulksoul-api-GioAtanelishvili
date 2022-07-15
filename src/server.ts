import bodyParser from 'body-parser'
import express from 'express'
import dotenv from 'dotenv'

import { apiRoutes } from 'routes'
import { connectMongo } from 'config'

const server = express()
dotenv.config()
connectMongo()

server.use(bodyParser.json())

server.use('/api', apiRoutes)

server.listen(process.env.SERVER_PORT || 3000)
