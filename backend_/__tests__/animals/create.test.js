const request = require('supertest');
const app = require('../../app'); // Importa a instância do seu aplicativo Express
const { Animal } = require('../../app/models');
const { OwnerAnimal } = require('../../app/models');

jest.mock('../../app/models/Animal');
jest.mock('../../app/models/OwnerAnimal');

describe('Animal Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create an animal and its owner', async () => {
    const mockAnimal = {
      id: 1,
      name: 'TestAnimal',
      age: 5,
      weight: 20,
      breed: 'TestBreed',
      coat_color: 'Black',
      size: 'Medium',
      species: 'Dog',
      reg_ibama: '12345',
    };
    const mockUser = {
      id: 1,
      name: 'TestUser',
    };

    Animal.create.mockResolvedValue(mockAnimal);
    OwnerAnimal.create.mockResolvedValue({
      animal_id: mockAnimal.id,
      user_id: mockUser.id,
    });

    const res = await request(app)
      .post('/animals')
      .send({
        name: 'TestAnimal',
        age: 5,
        weight: 20,
        breed: 'TestBreed',
        coat_color: 'Black',
        size: 'Medium',
        species: 'Dog',
        reg_ibama: '12345',
        token: 'mockJwtToken',
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('name');
    expect(res.body).toHaveProperty('age');
    expect(res.body).toHaveProperty('weight');
    expect(res.body).toHaveProperty('breed');
    expect(res.body).toHaveProperty('coat_color');
    expect(res.body).toHaveProperty('size');
    expect(res.body).toHaveProperty('species');
    expect(res.body).toHaveProperty('reg_ibama');
    expect(Animal.create).toHaveBeenCalledWith(expect.anything());
    expect(OwnerAnimal.create).toHaveBeenCalledWith({
      animal_id: expect.any(Number),
      user_id: expect.any(Number),
    });
  });
});
