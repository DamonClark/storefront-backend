import express, { Request, Response } from 'express'
import { Order, OrderList } from '../models/order'

const orderlist = new OrderList()

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
  app.get('/orders/:id', show)
}

export default orderRoutes