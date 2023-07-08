const request = require('supertest');
const { HealthHistory } = require('../../app/models');
const app = require('../../app');

jest.mock('../../app/models');

describe('Delete HealthHistory Endpoint', () => {
  it('should delete a health history', async () => {
    const id = 1;

    // Mocking the findOne method to return a fake health history
    HealthHistory.findOne.mockResolvedValue({ id });

    // Mocking the destroy method to simulate a successful deletion
    HealthHistory.destroy.mockResolvedValue(1); // destroy returns the number of rows deleted

    const res = await request(app).delete(`/healthHistory/${id}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', `Health history with id ${id} deleted successfully!`);
  });

  it('should return an error if health history not found', async () => {
    const id = 2;

    // Mocking the findOne method to return null
    HealthHistory.findOne.mockResolvedValue(null);

    const res = await request(app).delete(`/healthHistory/${id}`);

    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty('message', 'Health history not found!');
  });
});
