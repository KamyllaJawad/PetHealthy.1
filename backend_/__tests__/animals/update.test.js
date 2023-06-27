const { Animal } = require("../../app/models");
const { OwnerAnimal } = require("../../app/models");
const jwt = require('jsonwebtoken');

const controller = require('../../controllers/animals/update');

// Mocking dependencies
jest.mock('jsonwebtoken', () => ({
  verify: jest.fn().mockReturnValue({ id: 'user-id' }),
}));
jest.mock('../../app/models', () => ({
  Animal: {
    update: jest.fn(),
  },
  OwnerAnimal: {
    create: jest.fn(),
  },
}));
jest.mock('../../app', () => ({
  emit: jest.fn(),
}));

describe('Your Controller', () => {
  let req;
  let res;

  beforeEach(() => {
    req = {
      params: {
        id: 'animal-id',
      },
      headers: {
        token: 'mocked-token',
      },
      body: {
        name: 'Updated Animal Name',
        age: 5,
        weight: 15,
        breed: 'Updated Animal Breed',
        coat_color: 'Updated Animal Color',
        size: 'Updated Animal Size',
        species: 'Updated Animal Species',
        reg_ibama: 'Updated Animal Registration',
      },
    };
    res = {
      send: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should update an animal and return its updated details', async () => {
    const animalMock = { id: 'animal-id', name: 'Updated Animal Name' };
    const requestMock = { idUser: 'user-id', ...req.body };

    Animal.update.mockResolvedValueOnce([1, [animalMock]]);

    await controller(req, res);

    expect(jwt.verify).toHaveBeenCalledWith('mocked-token', process.env.KEYJWT);
    expect(Animal.update).toHaveBeenCalledWith(requestMock, {
      where: { id: 'animal-id' },
      returning: true,
    });
    expect(res.send).toHaveBeenCalledWith(animalMock);
  });

  test('should handle an error when animal is not found and send it as a response', async () => {
    const errorMock = new Error('Animal not found');

    Animal.update.mockResolvedValueOnce([0]);

    await controller(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith({ error: errorMock.message });
  });

  test('should handle an error and send it as a response', async () => {
    const errorMock = new Error('Something went wrong');

    Animal.update.mockRejectedValueOnce(errorMock);

    await controller(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith({ error: errorMock.message });
  });

  test('should handle missing weight and size and throw an error', async () => {
    req.body.weight = null;
    req.body.size = null;

    await expect(controller(req, res)).rejects.toThrowError('Peso e tamanho são obrigatórios');
  });
});
