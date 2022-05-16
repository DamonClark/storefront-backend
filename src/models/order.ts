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
}