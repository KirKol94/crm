import { type Request, type Response, Router } from 'express'

export const indexRouter = (): Router => {
   const router = Router()

   router.get('/', (req: Request, res: Response) => {
      res.send({ message: 'ok' })
   })

   return router
}
