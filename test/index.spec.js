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

describe('POST /task', () => {

  describe('Given a title and description', () => {

    const newTask = {
      title: 'New title',
      description: 'Description demo'
    }

    // Should respond with a 200 status code
    test('Should respond with a 200 status code',async() => {
      const response = await request(app).post('/task').send(newTask);
      expect(response.statusCode).toBe(200);
    });

    // Should respond with  a content-type of application/json
    test('Should have a content-type: application/json in header',async() => {
      const response = await request(app).post('/task').send(newTask);
      expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
    });

    // Should respond with a json object containing the new task with an id
    test('Should respond with an Test ID', async() => {
      const response = await request(app).post('/task').send(newTask);
      expect(response.body.id).toBeDefined();
    });
  });

  describe('When title and description missing', () => {

    test('Should respond wit a 400 status code', async() => {
      const fields = [
        {},
        {title: 'New title'},
        {description: 'Description demo'}
      ];
      for(const body of fields){
        const response = await request(app).post('/task').send(body);
        expect(response.statusCode).toBe(400);
      }
    });
    
  });

});