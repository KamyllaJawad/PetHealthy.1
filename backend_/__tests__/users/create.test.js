const request = require('supertest');
const { User } = require('../../app/models');
const app = require('../../app'); // Import your Express app

jest.mock('../../app/models');

describe("Create User Endpoint", () => {
  it("should create a new user", async () => {
    const mockUser = { name: 'John Doe', email: 'johndoe@example.com', password: 'password', cpf: '12345678900', login: 'johndoe', birthdate: '1990-01-01' };

    User.create.mockResolvedValue(mockUser);

    const res = await request(app)
      .post(`/users`)
      .send(mockUser);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("name");
    expect(res.body).toHaveProperty("email");
  });

  it("should return error if login or email is not provided", async () => {
    const mockUser = { name: 'John Doe', password: 'password', cpf: '12345678900', birthdate: '1990-01-01' };

    const res = await request(app)
      .post(`/users`)
      .send(mockUser);

    expect(res.statusCode).toEqual(500);
    expect(res.body).toHaveProperty("message", "Nome e Email são obrigatorios");
  });

  it("should handle errors", async () => {
    const mockUser = { name: 'John Doe', email: 'johndoe@example.com', password: 'password', cpf: '12345678900', login: 'johndoe', birthdate: '1990-01-01' };

    User.create.mockRejectedValue(new Error("Fake error"));

    const res = await request(app)
      .post(`/users`)
      .send(mockUser);

    expect(res.statusCode).toEqual(500);
  });
});
