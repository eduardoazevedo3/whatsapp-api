import { Request, Response } from 'express'
import QRCode from 'qrcode'
import { Client } from '../models'
import WhatappService from '../services/whatsapp.service'
import { parameterizeString } from '../utils'
import ApiController from './api.controller'

class ClientController extends ApiController {
  /*
   * GET /v1/clients
   */
  async index(_req: Request, res: Response) {
    const records = await Client.find()

    res.send(records)
  }

  /*
   * GET /v1/clients/:key
   */
  async show(req: Request, res: Response) {
    const { key } = req.params
    const record = await Client.where({ key }).findOne()

    res.send(record || 404)
  }

  /*
   * POST /v1/clients
   */
  async create(req: Request, res: Response) {
    try {
      const key = parameterizeString(req.params.key || '')
      const record = await Client.create({ key })

      res.send(record)
    } catch (error: any) {
      if (error.code == 11000) {
        res.send(`Client "${error.keyValue.key}" already exists`)
      } else {
        res.status(422).send(error.message)
      }
    }
  }

  /*
   * GET /v1/clients/:key/connect
   */
  async connect(req: Request, res: Response) {
    const key = parameterizeString(req.params.key || '')
    const whatsappService = new WhatappService(key)
    const client = whatsappService.client

    client.on('qr', (qr: string) => {
      QRCode.toFileStream(res, qr)
    })

    client.on('ready', async () => {
      try {
        let record = await Client.where({ key }).findOne()
        if (!record) record = await Client.create({ key })

        res.send(record)
      } catch (error: any) {
        res.status(422).send(error.message)
      }
    })

    await client.initialize()
  }

  /*
   * DELETE /v1/clients/:key
   */
  async delete(req: Request, res: Response) {
    try {
      const { key } = req.params
      const record = await Client.deleteOne({ key })

      res.send(record || 404)
    } catch (error: any) {
      res.status(422).send(error.message)
    }
  }
}

export default new ClientController()
