import { Router } from 'express'
import clientController from './controllers/ClientController'

export default function (): Router {
  const route = Router()

  route.get('/v1/clients', clientController.index)
  route.post('/v1/clients', clientController.create)
  route.get('/v1/clients/:key', clientController.show)
  route.get('/v1/clients/:key/connect', clientController.connect)
  route.delete('/v1/clients/:key', clientController.delete)

  return route
}
