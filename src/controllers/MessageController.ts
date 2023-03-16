import { Request, Response } from 'express'
import { Message } from '../models'
import ApiController from './ApiController'

class MessageController extends ApiController {
  /*
   * GET /v1/messages
   */
  async index(_req: Request, res: Response) {
    const records = await Message.find()

    res.send(records)
  }

  /*
   * GET /v1/messages/:id
   */
  async show(req: Request, res: Response) {
    try {
      const { id } = req.params
      const record = await Message.where({ id }).findOne()

      res.send(record || 404)
    } catch (error: any) {
      res.send(error.message)
    }
  }

  /*
   * POST /v1/messages
   */
  async create(req: Request, res: Response) {
    try {
      const { from, to, name, text } = req.params
      const record = await Message.create({ from, to, name, text })

      res.send(record)
    } catch (error: any) {
      res.send(error.message)
    }
  }
}

export default new MessageController()
