import { ProductStore } from '../src/models/product';
import { UserGroup } from '../src/models/user';
import { OrderList } from '../src/models/order';


import app from '../src/server'; 
import supertest from 'supertest';

const order = new UserGroup()
const user = new UserGroup()
const product = new ProductStore()
const request = supertest(app)
let token: any;

describe("Order Model", () => {
  beforeAll(async () => {
    await product.create({
      id: 1,
      name: 'Crockpot',
      price: '39.00'
    });
    await user.create({
      id: 1,
      first_name: 'Damon',
      last_name: 'Clark',
			username: 'dclark',
      password_digest: 'secret'
    });

    token = await request.post('/users').send(user)
  });

  it('show method for order', async () => {
    await order.show('1');
  });

  it('should respond with 200 when passing show /orders/1', async done => {
    const response = await request.get('/orders/1').set("Authorization", `Bearer ` + token.body); 
    expect(response.statusCode).toBe(200);
    done()
  });
});
