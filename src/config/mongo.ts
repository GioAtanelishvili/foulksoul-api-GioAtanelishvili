import mongoose from 'mongoose'
import dotenv from 'dotenv'

const connectMongo = async () => {
  dotenv.config()

  const mongoUri =
    process.env.MONGO_PROTOCOL === 'mongodb+srv'
      ? `${process.env.MONGO_PROTOCOL}://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}.${process.env.MONGO_HOST}/${process.env.MONGO_DATABASE}?${process.env.MONGO_PARAMS}`
      : `${process.env.MONGO_PROTOCOL}://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DATABASE}`

  try {
    return await mongoose.connect(mongoUri)
  } catch (err) {
    console.error(err)
  }
}

export default connectMongo
