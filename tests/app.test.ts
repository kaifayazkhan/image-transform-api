import { describe, expect, it } from 'vitest';
import supertest from 'supertest';
import app from '../src/app.js';

const request = supertest(app);

describe('GET /', () => {
  it('should return 200 with message "OK"', async () => {
    const response = await request.get('/');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'OK' });
  });
});
