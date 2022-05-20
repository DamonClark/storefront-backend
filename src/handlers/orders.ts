import express, { Request, Response } from 'express'
import { OrderList } from '../models/order'
import jwt from 'jsonwebtoken'

const orderlist = new OrderList()

const verifyAuthToken = (req: Request, res: Response, next: () => void) => {
  try {
      const authorizationHeader: any= req.headers.authorization
      const token = authorizationHeader.split(' ')[1]
      const decoded = jwt.verify(token, process.env.TOKEN_SECRET as string)
      next()
  } catch (error) {
      res.status(401)
  }
}

const show = async (req: Request, res: Response) => {
  try {
    const order = await orderlist.show(req.body.id)
    res.json(order)
  } catch(err) {
    res.status(400)
    res.json(err)
  }
}

const orderRoutes = (app: express.Application) => {
  app.get('/orders/:id', verifyAuthToken, show)
}

export default orderRoutes