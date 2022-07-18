import { ProductStore } from '../src/models/product';
import { UserGroup } from '../src/models/user';
import app from '../src/server'; 
import supertest from 'supertest';

const store = new ProductStore()
const user = new UserGroup()
const request = supertest(app)
let token: any;

const product = {
  id: 1,
  name: 'Iphone',
  price: '100'
}

describe("Product Model", () => {
  beforeAll(async () => {
    token = await request.post('/users').send(user)
  });

  it('should respond with 200 when passing post /products', async done => {
    const response = await request.post('/products').send(product).set("Authorization", `Bearer ` + token.body);
    expect(response.statusCode).toBe(200);
    done()
  });

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

  it('index method for product', async () => {
    const result = await store.index();
    expect(result).toBeTrue();
  });

  it('show method for product', async () => {
    const result = await store.show('2');
    expect(result.id).toEqual(2);
  });

  it('create method should add a product', async () => {
    const result = await store.create({
      id: 1,
      name: 'Crockpot',
      price: '39.00'
    });
    expect(result.name).toEqual('Crockpot'),
    expect(result.price).toEqual('39.00')
  });
});
