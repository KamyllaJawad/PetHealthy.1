const request = require('supertest');
const { Animal, OwnerAnimal } = require("../../app/models");
const app = require('../../app'); // Import your Express app

jest.mock("../../app/models");

describe("Delete Animal Endpoint", () => {
  it("should delete an animal", async () => {
    const mockAnimal = { id: 1 };
    const mockOwnerAnimal = { animal_id: 1 };

    Animal.findOne.mockResolvedValue(mockAnimal);
    OwnerAnimal.findOne.mockResolvedValue(mockOwnerAnimal);

    Animal.destroy.mockResolvedValue(1);
    OwnerAnimal.destroy.mockResolvedValue(1);

    const res = await request(app)
      .delete(`/animals/${mockAnimal.id}`)
      .send();

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("message");
  });

  it("should return 404 when animal not found", async () => {
    Animal.findOne.mockResolvedValue(null);

    const res = await request(app)
      .delete(`/animals/1`)
      .send();

    expect(res.statusCode).toEqual(404);
  });

  it("should handle errors", async () => {
    const mockError = new Error("Fake error");

    Animal.findOne.mockRejectedValue(mockError);

    const res = await request(app)
      .delete(`/animals/1`)
      .send();

    expect(res.statusCode).toEqual(500);
    expect(res.body).toHaveProperty("error");
  });
});
