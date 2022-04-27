import express, { Request, Response } from 'express'
import { Order, OrderList } from '../models/order'

const orderlist = new OrderList()

const show = async (req: Request, res: Response) => {
   const order = await orderlist.show(req.body.id)
   res.json(order)
}

const orderRoutes = (app: express.Application) => {
  app.get('/orders/:id', show)
}

export default orderRoutes