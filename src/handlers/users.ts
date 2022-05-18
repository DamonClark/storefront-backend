import express, { Request, Response } from 'express'
import { User, UserGroup } from '../models/user'
import jwt from 'jsonwebtoken'

const usergroup = new UserGroup()

const index = async (_req: Request, res: Response) => {
  const users = await usergroup.index()
  res.json(users)
}

const show = async (req: Request, res: Response) => {
   const user = await usergroup.show(req.body.id)
   res.json(user)
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
      res.json(err + user)
  }
}

const userRoutes = (app: express.Application) => {
  app.get('/users', index)
  app.get('/users/:id', show),
  app.post('/users', create)
}

export default userRoutes