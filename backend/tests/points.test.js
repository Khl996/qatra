const request = require('supertest');
const app = require('../index');
const { sequelize } = require('../config/database');
const Point = require('../models/Point');

describe('Points API', () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  it('should add points to user', async () => {
    const response = await request(app)
      .post('/api/points/add')
      .send({
        userId: 'test-user-id',
        storeId: 'test-store-id',
        points: 10
      })
      .set('Authorization', `Bearer ${process.env.TEST_TOKEN}`);

    expect(response.status).toBe(200);
    expect(response.body.points).toBe(10);
  });

  afterAll(async () => {
    await sequelize.close();
  });
});
