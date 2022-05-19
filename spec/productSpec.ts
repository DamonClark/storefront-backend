import { ProductStore } from '../src/models/product';
import app from '../src/server'; 
import supertest from 'supertest';

const store = new ProductStore()
const request = supertest(app)

describe("Product Model", () => {
  it('should respond with 200 when passing index /product', async done => {
    const response = await request.get('/products')
    expect(response.statusCode).toBe(200);
    done()
  });

  it('should respond with 200 when passing show /product/1', async done => {
    const response = await request.get('/products/1')
    expect(response.statusCode).toBe(200);
    done()
  });

  it('create method should add a product', async () => {
    const result = await store.create({
      id: 1,
      name: 'Crockpot',
      price: '39.00'
    });
    expect(result).toEqual({
      id: 1,
      name: 'Crockpot',
      price: '39.00',
    });
  });
});
