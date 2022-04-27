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
}