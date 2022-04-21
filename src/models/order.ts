// @ts-ignore
import client from '../database'

export type Order = {
	id: number;
	product_id: number;
	quantity: string;
	user_id: number;
  status: string;
}

export class OrderList {
	async index(): Promise<Order[]> {
    try {
      // @ts-ignore
      const conn = await client.connect()
      const sql = 'SELECT * FROM orders'

      const result = await conn.query(sql)

      conn.release()

      return result.rows 
    } catch (err) {
      throw new Error(`Could not get orders. Error: ${err}`)
    }
  }

  async show(id: string): Promise<Order> {
    try {
    const sql = 'SELECT * FROM orders WHERE id=($1)'
    // @ts-ignore
    const conn = await client.connect()

    const result = await conn.query(sql, [id])

    conn.release()

    return result.rows[0]
    } catch (err) {
        throw new Error(`Could not find order ${id}. Error: ${err}`)
    }
  }

  async create(o: Order): Promise<Order> {
    try {
      const sql = 'INSERT INTO orders (quantity, status) VALUES($1, $2) RETURNING *'
      // @ts-ignore
      const conn = await client.connect()

      const result = await conn
          .query(sql, [o.quantity])

      const order = result.rows[0]

      conn.release()

    return order
      } catch (err) {
          throw new Error(`Could not add new order ${o.quantity}. Error: ${err}`)
      }
  }

  async delete(id: string): Promise<Order> {
      try {
    const sql = 'DELETE FROM orders WHERE id=($1)'
    // @ts-ignore
    const conn = await client.connect()

    const result = await conn.query(sql, [id])

    const book = result.rows[0]

    conn.release()

    return book
      } catch (err) {
          throw new Error(`Could not delete order ${id}. Error: ${err}`)
      }
  }
}