import express, { Request, Response } from 'express'
import { User, UserGroup } from '../models/user'

const usergroup = new UserGroup()

const show = async (req: Request, res: Response) => {
   const user = await usergroup.show(req.body.id)
   res.json(user)
}

// const create = async (req: Request, res: Response) => {
//   try {
//       const user: User = {
//           id: req.body.id,
//           first_name: req.body.first_name,
//           last_name: req.body.last_name,
// 					password_digest: req.body.password_digest,
//       }

//       const newUser = await usergroup.create(user)
//       res.json(newUser)
//   } catch(err) {
//       res.status(400)
//       res.json(err)
//   }
// }

const userRoutes = (app: express.Application) => {
  app.get('/users/:id', show)
}

export default userRoutes