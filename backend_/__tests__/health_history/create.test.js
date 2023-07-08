const request = require('supertest');
const { HealthHistory } = require('../../app/models');
const app = require('../../app'); // Import your Express app

jest.mock('../../app/models');

describe('Create HealthHistory Endpoint', () => {
  it('should create a new health history', async () => {
    const newHealthHistory = {
      event_date: new Date(),
      description: 'Test Description',
      fk_event_type: 1,
      fk_animal: 1
    };
    
    HealthHistory.create.mockResolvedValue(newHealthHistory);
    
    const res = await request(app)
      .post('/healthHistory')
      .send(newHealthHistory);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('event_date');
    expect(res.body).toHaveProperty('description');
    expect(res.body).toHaveProperty('fk_event_type');
    expect(res.body).toHaveProperty('fk_animal');
  });

  it('should return an error if event_date is missing', async () => {
    const newHealthHistory = {
      description: 'Test Description',
      fk_event_type: 1,
      fk_animal: 1
    };
    
    const res = await request(app)
      .post('/healthHistory')
      .send(newHealthHistory);

    expect(res.statusCode).toEqual(500);
    expect(res.body).toHaveProperty('message', 'event_date is required');
  });

  it('should handle errors', async () => {
    const newHealthHistory = {
      event_date: new Date(),
      description: 'Test Description',
      fk_event_type: 1,
      fk_animal: 1
    };
    
    HealthHistory.create.mockRejectedValue(new Error('Fake error'));

    const res = await request(app)
      .post('/healthHistory')
      .send(newHealthHistory);

    expect(res.statusCode).toEqual(500);
  });
});
