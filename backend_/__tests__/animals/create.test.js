const { Animal } = require("../../app/models");
const { OwnerAnimal } = require("../../app/models");
const jwt = require('jsonwebtoken');

const controller = require('../../controllers/animals/create');

// Mocking dependencies
jest.mock('jsonwebtoken', () => ({
  verify: jest.fn().mockReturnValue({ id: 'user-id' }),
}));
jest.mock('../../app/models', () => ({
  Animal: {
    create: jest.fn(),
  },
  OwnerAnimal: {
    create: jest.fn(),
  },
}));
jest.mock('../../app', () => ({
  emit: jest.fn(),
}));

describe.only('Your Controller', () => {
  let req;
  let res;

  beforeEach(() => {
    req = {
      headers: {
        token: 'mocked-token',
      },
      body: {
        name: 'Animal Name',
        age: 3,
        weight: 10,
        breed: 'Animal Breed',
        coat_color: 'Animal Color',
        size: 'Animal Size',
        species: 'Animal Species',
        reg_ibama: 'Animal Registration',
      },
    };
    res = {
      send: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should create an animal and return its details', async () => {
    const animalMock = { id: 'animal-id', name: 'Animal Name' };
    const requestMock = { idUser: 'user-id', ...req.body };

    Animal.create.mockResolvedValueOnce(animalMock);

    await controller(req, res);

    expect(jwt.verify).toHaveBeenCalledWith('mocked-token', process.env.KEYJWT);
    expect(Animal.create).toHaveBeenCalledWith(requestMock);
    expect(OwnerAnimal.create).toHaveBeenCalledWith({ animal_id: 'animal-id', user_id: 'user-id' });
    expect(res.send).toHaveBeenCalledWith(animalMock);
  });

  test('should handle an error and send it as a response', async () => {
    const errorMock = new Error('Something went wrong');

    Animal.create.mockRejectedValueOnce(errorMock);

    await controller(req, res);

    expect(res.send).toHaveBeenCalledWith(errorMock);
  });

  test('should handle missing weight and size and throw an error', async () => {
    req.body.weight = null;
    req.body.size = null;

    await expect(controller(req, res)).rejects.toThrowError('Idade e peso são obrigatorios');
  });
});
