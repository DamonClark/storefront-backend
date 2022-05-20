import express, { Request, Response } from 'express'
import { User, UserGroup } from '../models/user'
import jwt from 'jsonwebtoken'

const usergroup = new UserGroup()

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
    const users = await usergroup.index()
    res.json(users)
  } catch(err) {
    res.status(400)
    res.json(err)
  }
}

const show = async (req: Request, res: Response) => {
  try {
    const user = await usergroup.show(req.body.id)
    res.json(user)
  } catch(err) {
    res.status(400)
    res.json(err)
  }
}

const create = async (req: Request, res: Response) => {
  const user: User = {
      id: req.body.id,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      username: req.body.username,
      password_digest: req.body.password_digest,
  }

  try {
      const newUser = await usergroup.create(user)
      var token = jwt.sign({ user: newUser }, process.env.TOKEN_SECRET as string);
      res.json(token)
  } catch(err) {
      res.status(400)
      res.json(err)
  }
}

const userRoutes = (app: express.Application) => {
  app.get('/users', verifyAuthToken, index)
  app.get('/users/:id', verifyAuthToken, show)
  app.post('/users', verifyAuthToken, create)
}

export default userRoutes