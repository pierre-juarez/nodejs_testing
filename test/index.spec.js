import app from '../src/app.js';
import request from 'supertest';

describe('GET /task', () => {
  test('Should respond with a 200 status code', async() => {
    const response = await request(app).get('/task').send();
    expect(response.statusCode).toBe(200);
  });

  test('Should respond with an array',async() => {
    const response = await request(app).get('/task').send();
    expect(response.body).toBeInstanceOf(Array);
  });

});