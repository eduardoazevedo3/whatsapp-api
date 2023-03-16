import mongoose from 'mongoose'

const { Schema, model } = mongoose

const messageSchema = new Schema({
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  sent: {
    type: Boolean,
    required: true,
    default: false,
  },
})

export default model('Message', messageSchema)
