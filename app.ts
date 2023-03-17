import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import Routes from './src/Routes'

const app = express()
const route = Routes()

dotenv.config()

mongoose.connect(process.env.MONGODB_URI || '')

app.use(route)

export default app
