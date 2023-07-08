const request = require('supertest');
const { HealthHistory } = require('../../app/models');
const app = require('../../app');

jest.mock('../../app/models');

describe('Update HealthHistory Endpoint', () => {
  it('should update a health history', async () => {
    const id = 1;
    const updatedData = {
      event_date: '2023-10-10',
      description: 'Updated Description',
      fk_event_type: 2,
      fk_animal: 2
    };

    // Mocking the findOne method to return a fake health history
    HealthHistory.findOne.mockResolvedValue({ id, ...updatedData });

    // Mocking the update method to simulate a successful update
    HealthHistory.update.mockResolvedValue([1]); // update returns the number of rows updated

    const res = await request(app).put(`/healthHistory/${id}`).send(updatedData);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', `Health history with id ${id} updated successfully!`);
  });

  it('should return an error if health history not found', async () => {
    const id = 2;
    const updatedData = {
      event_date: '2023-10-11',
      description: 'Another Updated Description',
      fk_event_type: 3,
      fk_animal: 3
    };

    // Mocking the findOne method to return null
    HealthHistory.findOne.mockResolvedValue(null);

    const res = await request(app).put(`/healthHistory/${id}`).send(updatedData);

    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty('message', 'Health history not found!');
  });
});
