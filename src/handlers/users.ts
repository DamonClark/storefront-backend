import express, { Request, Response } from 'express'
import { User, UserGroup } from '../models/user'

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
  try {
      const user: User = {
          id: req.body.id,
          first_name: req.body.first_name,
          last_name: req.body.last_name,
					password_digest: req.body.password_digest,
      }

      const newUser = await usergroup.create(user)
      res.json(newUser)
  } catch(err) {
      res.status(400)
      res.json(err)
  }
}

const destroy = async (req: Request, res: Response) => {
  const deleted = await usergroup.delete(req.body.id)
  res.json(deleted)
}

const userRoutes = (app: express.Application) => {
  app.get('/users', index)
  app.get('/users/:id', show)
  app.post('/users', create)
  app.delete('/users', destroy)
}

export default userRoutes