import bcrypt, { compareSync } from 'bcrypt';
import { UserGroup } from '../src/models/user';

const user = new UserGroup()

describe("User Model", () => {
  it('should have an index method', () => {
    expect(user.index).toBeDefined();
  });

  it('should have an show method', () => {
    expect(user.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(user.create).toBeDefined();
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
