import mongoose from 'mongoose'
import dotenv from 'dotenv'

const connectMongo = async () => {
  dotenv.config()

  const {
    MONGO_PROTOCOL,
    MONGO_USER,
    MONGO_PASSWORD,
    MONGO_CLUSTER,
    MONGO_HOST,
    MONGO_PORT,
    MONGO_DATABASE,
    MONGO_PARAMS,
  } = process.env

  const mongoUri =
    MONGO_PROTOCOL === 'mongodb+srv'
      ? `${MONGO_PROTOCOL}://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_CLUSTER}.${MONGO_HOST}/${MONGO_DATABASE}?${MONGO_PARAMS}`
      : `${MONGO_PROTOCOL}://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DATABASE}`

  try {
    return await mongoose.connect(mongoUri)
  } catch (err) {
    console.error(err)
  }
}

export default connectMongo
