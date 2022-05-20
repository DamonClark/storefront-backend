import express, { Request, Response } from 'express'
import { Product, ProductStore } from '../models/product'
import jwt from 'jsonwebtoken'

const store = new ProductStore()

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

const index = async (_req: Request, res: Response) => {
  try {
    const products = await store.index()
    res.json(products)
  } catch(err) {
    res.status(400)
    res.json(err)
  }
} 

const show = async (req: Request, res: Response) => {
  try {
   const product = await store.show(req.body.id)
   res.json(product)
  } catch(err) {
    res.status(400)
    res.json(err)
  }
}

const create = async (req: Request, res: Response) => {
      const product: Product = {
          id: req.body.id,
          name: req.body.name,
          price: req.body.price,
      }
      
  try {
      const newProduct = await store.create(product)
      res.json(newProduct)
  } catch(err) {
      res.status(400)
      res.json(err)
  }
}

const productRoutes = (app: express.Application) => {
  app.get('/products', index)
  app.get('/products/:id', show)
  app.post('/products', verifyAuthToken, create)
}

export default productRoutes