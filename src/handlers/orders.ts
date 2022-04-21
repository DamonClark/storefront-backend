import express, { Request, Response } from 'express'
import { Order, OrderList } from '../models/order'

const orderlist = new OrderList()

const index = async (_req: Request, res: Response) => {
  const orders = await orderlist.index()
  res.json(orders)
}

const show = async (req: Request, res: Response) => {
   const order = await orderlist.show(req.body.id)
   res.json(order)
}

const create = async (req: Request, res: Response) => {
  try {
      const order: Order = {
          id: req.body.id,
          product_id: req.body.product_id,
          quantity: req.body.quantity,
					user_id: req.body.user_id,
          status: req.body.status
      }

      const newOrder = await orderlist.create(order)
      res.json(newOrder)
  } catch(err) {
      res.status(400)
      res.json(err)
  }
}

const destroy = async (req: Request, res: Response) => {
  const deleted = await orderlist.delete(req.body.id)
  res.json(deleted)
}

const orderRoutes = (app: express.Application) => {
  app.get('/orders', index)
  app.get('/orders/:id', show)
  app.post('/orders', create)
  app.delete('/orders', destroy)
}

export default orderRoutes