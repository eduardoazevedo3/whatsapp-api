import mongoose from 'mongoose'

const { Schema, model } = mongoose

const clientSchema = new Schema({
  key: {
    type: String,
    required: true,
    unique: true,
  },
})

export default model('Client', clientSchema)
