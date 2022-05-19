import { OrderList } from '../src/models/order';
import app from '../src/server'; 
import supertest from 'supertest';

const order = new OrderList()
const request = supertest(app)

describe("Order Model", () => {
  it('should respond with 200 when passing show /orders/1', async done => {
    const response = await request.get('/orders/1')
    expect(response.statusCode).toBe(200);
    done()
  });
});
