import bodyParser from 'body-parser'
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

import { swaggerMiddleware, errorHandlerMiddleware } from 'middlewares'
import { connectMongo } from 'config'
import { apiRoutes } from 'routes'

const server = express()
dotenv.config()
connectMongo()

server.use(bodyParser.json())

server.use('/api', cors(), apiRoutes)
server.use('/api-docs', swaggerMiddleware())

server.use(errorHandlerMiddleware)

server.listen(process.env.SERVER_PORT || 3000)
