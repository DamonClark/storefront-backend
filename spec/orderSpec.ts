import { UserGroup } from '../src/models/user';
import { ProductStore } from '../src/models/product';

import app from '../src/server'; 
import supertest from 'supertest';
import token from '../src/handlers/orders'

const user = new UserGroup()
const product = new ProductStore()
const request = supertest(app)

describe("Order Model", () => {
  beforeAll(() => {
    product.create({
      id: 1,
      name: 'Crockpot',
      price: '39.00'
    });
    user.create({
      id: 1,
      first_name: 'Damon',
      last_name: 'Clark',
			username: 'dclark',
      password_digest: 'secret'
    });
  });

  it('should respond with 200 when passing show /orders/1', async done => {
    const response = await request.get('/orders/1').set("Authorization", `Bearer ${token}`); 
    expect(response.statusCode).toBe(200);
    done()
  });
});
