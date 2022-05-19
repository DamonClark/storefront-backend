import bcrypt, { compareSync } from 'bcrypt';
import { UserGroup } from '../src/models/user';
import app from '../src/server'; 
import supertest from 'supertest';

const user = new UserGroup()
const request = supertest(app)


describe("User Model", () => {
  it('should respond with 200 when passing index /users', async done => {
    const response = await request.get('/users')
    expect(response.statusCode).toBe(200);
    done()
  });

  it('should respond with 200 when passing show /users/1', async done => {
    const response = await request.get('/users/1')
    expect(response.statusCode).toBe(200);
    done()
  });

  it('create method should add a user', async () => {
    const result = await user.create({
      id: 1,
      first_name: 'Damon',
      last_name: 'Clark',
			username: 'dclark',
      password_digest: 'secret'
    });
    expect(result.id).toEqual(1);
    expect(result.first_name).toEqual('Damon');
    expect(result.last_name).toEqual('Clark');
    expect(result.username).toEqual('dclark');
    // expect(compareSync(result.password_digest, bcrypt.hash.toString())).toBeTrue()
  });
});
