const request = require('supertest');
const { User } = require('../../app/models');
const app = require('../../app'); // Import your Express app

jest.mock('../../app/models');

describe('Delete User Endpoint', () => {
  it('should delete an existing user', async () => {
    User.destroy.mockResolvedValue(1);

    const res = await request(app)
      .delete('/users/1');

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Usuário com id 1 excluído com sucesso!');
  });

  it('should return an error if no user is found', async () => {
    User.destroy.mockResolvedValue(0);

    const res = await request(app)
      .delete('/users/1');

    expect(res.statusCode).toEqual(500);
    expect(res.body).toHaveProperty('message', 'Usuário não encontrado');
  });

  it('should handle errors', async () => {
    User.destroy.mockRejectedValue(new Error('Fake error'));

    const res = await request(app)
      .delete('/users/1');

    expect(res.statusCode).toEqual(500);
  });
});
