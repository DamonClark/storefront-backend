// @ts-ignore
import Product from '../database'

export type Product = {
	id: number;
	name: string;
	price: number;
}

export class ProductStore {
	async index(): Promise<Product[]> {
    try {
      // @ts-ignore
      const conn = await Client.connect()
      const sql = 'SELECT * FROM product'

      const result = await conn.query(sql)

      conn.release()

      return result.rows 
    } catch (err) {
      throw new Error(`Could not get products. Error: ${err}`)
    }
  }
}