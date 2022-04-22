// @ts-ignore
import client from '../database'
import bcrypt from 'bcrypt'

export type User = {
	id: number;
	first_name: string;
	last_name: string;
	password_digest: string;
}

export class UserGroup {
	async index(): Promise<User[]> {
    try {
      // @ts-ignore
      const conn = await client.connect()
      const sql = 'SELECT * FROM users'

      const result = await conn.query(sql)

      conn.release()

      return result.rows 
    } catch (err) {
      throw new Error(`Could not get users. Error: ${err}`)
    }
  }

  async show(id: string): Promise<User> {
    try {
    const sql = 'SELECT * FROM users WHERE id=($1)'
    // @ts-ignore
    const conn = await client.connect()

    const result = await conn.query(sql, [id])

    conn.release()

    return result.rows[0]
    } catch (err) {
        throw new Error(`Could not find user ${id}. Error: ${err}`)
    }
  }

  async create(u: User): Promise<User> {
    try {
      const sql = 'INSERT INTO users (first_name, last_name, password_digest) VALUES($1, $2, $3) RETURNING *'
      // @ts-ignore
      const conn = await client.connect()
      const pepper = process.env.BCRYPT_PASSWORD; 
      const saltRounds  = process.env.SALT_ROUNDS as string;

      const hash = bcrypt.hashSync(
        u.password_digest + pepper, 
        parseInt(saltRounds)
      );

      const result = await conn.query(sql, [u.first_name, u.last_name, hash])
      const user = result.rows[0]

      conn.release()

    return user
      } catch (err) {
          throw new Error(`Could not add new user ${u.first_name}. Error: ${err}`)
      }
  }

  async authenticate(username: string, password: string): Promise<User | null> {
    let client: any;
    const conn = await client.connect()
    const sql = 'SELECT password_digest FROM users WHERE username=($1)'

    const result = await conn.query(sql, [username])
    const pepper = process.env.BCRYPT_PASSWORD; 

    console.log(password+pepper)

    if(result.rows.length) {

      const user = result.rows[0]

      console.log(user)

      if (bcrypt.compareSync(password+pepper, user.password_digest)) {
        return user
      }
    }

    return null
  }

  async delete(id: string): Promise<User> {
    try {
        const sql = 'DELETE FROM users WHERE id=($1)'
        // @ts-ignore
        const conn = await client.connect()

        const result = await conn.query(sql, [id])

        const book = result.rows[0]

        conn.release()

        return book
    } catch (err) {
        throw new Error(`Could not delete user ${id}. Error: ${err}`)
    }
  }
}