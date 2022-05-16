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
    expect(result).toEqual({
      id: 1,
      first_name: 'Damon',
      last_name: 'Clark',
			username: 'dclark',
      password_digest: '$2b$10$zQcCAXob7mxzRqRQPuyKh.uPj4r1rw/x12xFgp6hF2byGm9gQaUbe'      
    });
  });
});
