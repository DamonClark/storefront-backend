import bcrypt, { compareSync } from 'bcrypt';
import { UserGroup } from '../src/models/user';
import app from '../src/server'; 
import supertest from 'supertest';

const user = new UserGroup()
const request = supertest(app)

let token: any;

describe("User Model", () => {
  beforeAll(async () => {
    token = await request.post('/users').send(user)
  });

  it('create method should add a user', async () => {
    const result = await user.create({
      id: 2,
      first_name: 'Damon',
      last_name: 'Clark',
			username: 'dclark',
      password_digest: 'secret'
    });
    expect(result.first_name).toEqual('Damon');
    expect(result.last_name).toEqual('Clark');
    expect(result.username).toEqual('dclark');
  });

  it('index method for user', async () => {
    const result = await user.index();
    expect(result).toBeTrue();
  });

  it('show method for user', async () => {
    const result = await user.show('1');
    expect(result.id).toEqual(1);
  });

  it('should respond with 200 when passing index /users', async done => {
    const response = await request.get('/users').set("Authorization", `Bearer ` + token.body);
    expect(response.statusCode).toBe(200);
    done()
  });

  it('should respond with 200 when passing show /users/1', async done => {
    const response = await request.post('/users').send(user).set("Authorization", `Bearer ` + token.body);
    expect(response.statusCode).toBe(200);
    done()
  });

  it('should respond with 200 when passing post /users', async done => {
    const response = await request.get('/users').set("Authorization", `Bearer ` + token.body);
    expect(response.statusCode).toBe(200);
    done()
  });
});
