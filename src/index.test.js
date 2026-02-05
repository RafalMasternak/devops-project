const request = require('supertest');
const app = require('./index');

describe('API Endpoints', () => {
  describe('GET /health', () => {
    it('should return health status', async () => {
      const res = await request(app).get('/health');
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('status', 'ok');
      expect(res.body).toHaveProperty('timestamp');
    });
  });

  describe('POST /tasks', () => {
    it('should return 400 if title is missing', async () => {
      const res = await request(app)
        .post('/tasks')
        .send({ description: 'Test description' });
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('error', 'Title is required');
    });
  });
});
