const request = require('supertest');
const { User } = require('../../app/models');
const app = require('../../app'); // Import your Express app

jest.mock('../../app/models');

describe('Update User Endpoint', () => {
  it('should update an existing user', async () => {
    const mockUser = { id: 1, name: 'John Doe', email: 'johndoe@example.com', password: 'password', cpf: '12345678900', login: 'johndoe', birthdate: '1990-01-01' };
    User.update.mockResolvedValue(mockUser);

    const res = await request(app)
      .put(`/users/${mockUser.id}`)
      .send(mockUser);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('name', 'John Doe');
  });

  it('should return an error if no user is found', async () => {
    const mockUser = { id: 2, name: 'John Doe', email: 'johndoe@example.com', password: 'password', cpf: '12345678900', login: 'johndoe', birthdate: '1990-01-01' };
    User.update.mockResolvedValue(null);

    const res = await request(app)
      .put(`/users/${mockUser.id}`)
      .send(mockUser);

    expect(res.statusCode).toEqual(500);
    expect(res.body).toHaveProperty('message', 'User not found');
  });

  it('should handle errors', async () => {
    const mockUser = { id: 1, name: 'John Doe', email: 'johndoe@example.com', password: 'password', cpf: '12345678900', login: 'johndoe', birthdate: '1990-01-01' };
    User.update.mockRejectedValue(new Error('Fake error'));

    const res = await request(app)
      .put(`/users/${mockUser.id}`)
      .send(mockUser);

    expect(res.statusCode).toEqual(500);
  });
});
