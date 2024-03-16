import type { Request, Response } from 'express'

import { HttpStatusCodes } from '../const/HttpStatusCodes'
import { ClientModel as Client } from '../db/models/ClientModel'

export const ClientController = {
  findAll: async (req: Request, res: Response): Promise<void> => {
    try {
      const clients = await Client.findAll()
      res.json(clients)
    } catch (err) {
      res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ error: (err as Error).message })
    }
  },
}
