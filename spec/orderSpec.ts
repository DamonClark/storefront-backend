import { OrderList } from '../src/models/order';
import app from '../src/server'; 
import supertest from 'supertest';
import token from '../src/handlers/orders'

const order = new OrderList()
const request = supertest(app)

describe("Order Model", () => {
  fit('should respond with 200 when passing show /orders/1', async done => {
    console.log(token.toString())
    const response = await request.get('/orders/1').set('authorization', 'Bearer ' + token); 
    expect(response.statusCode).toBe(200);
    done()
  });
});
